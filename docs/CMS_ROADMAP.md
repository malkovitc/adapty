# CMS Roadmap & Technical Analysis

> Документ создан: 2025-12-24
> Проект: Adapty Website CMS

---

## Оглавление

1. [Текущее состояние](#текущее-состояние)
2. [Архитектура](#архитектура)
3. [Технические проблемы](#технические-проблемы)
4. [Roadmap](#roadmap)
5. [Рекомендации по рефакторингу](#рекомендации-по-рефакторингу)
6. [Инструкция по настройке](#инструкция-по-настройке)

---

## Текущее состояние

### Что работает

| Компонент | Статус | Описание |
|-----------|--------|----------|
| Sanity Client | ✅ Готов | Настроен, ожидает credentials |
| Schemas (Post, Category) | ✅ Готов | Полные схемы с валидацией |
| GROQ Queries | ✅ Готов | Запросы для всех операций |
| Server Actions | ✅ Готов | Безопасно скрывают API токен |
| Blog Service | ✅ Готов | Fallback на статические данные |
| CMS UI | ✅ Готов | ~1200 строк, полный интерфейс |
| Demo Mode | ✅ Работает | In-memory редактирование |

### Что не работает / не настроено

| Компонент | Статус | Причина |
|-----------|--------|---------|
| Write Operations | ❌ Отключено | Нет API токена |
| Image Upload | ❌ Не реализовано | UI есть, логика отсутствует |
| Sanity Studio | ❌ Не развёрнуто | Demo project ID |
| Revision History | ⚠️ Mock данные | Только UI |
| Create Post | ⚠️ Нет UI | Отсутствует кнопка/flow |

---

## Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  /blog      │  │  /blog/[slug]│  │  /cms               │  │
│  │  (listing)  │  │  (detail)    │  │  (editor)           │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
└─────────┼────────────────┼────────────────────┼─────────────┘
          │                │                    │
          ▼                ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              blog-service.ts                          │   │
│  │  • getAllPosts()      • createPost()                  │   │
│  │  • getPostBySlug()    • updatePost()                  │   │
│  │  • searchPosts()      • deletePost()                  │   │
│  └──────────────────────────┬───────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Sanity Client  │  │  Server Actions │  │  Static Data    │
│  (read + CDN)   │  │  (write ops)    │  │  (fallback)     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Ключевые файлы

```
src/
├── app/
│   ├── cms/
│   │   └── page.tsx              # CMS Editor (1261 строк) ⚠️ МОНОЛИТ
│   ├── actions/
│   │   └── blog.ts               # Server Actions
│   └── blog/
│       ├── page.tsx              # Blog listing
│       └── [slug]/page.tsx       # Blog detail
├── sanity/
│   ├── client.ts                 # Sanity clients
│   ├── queries.ts                # GROQ queries
│   └── schemas/
│       ├── post.ts               # Post schema
│       ├── category.ts           # Category schema
│       └── index.ts              # Exports
├── lib/
│   └── blog-service.ts           # Data service layer
├── data/
│   └── blog.ts                   # Static fallback (30+ posts)
└── types/
    └── sanity.ts                 # TypeScript definitions
```

---

## Технические проблемы

### 1. Монолитный компонент CMS

**Файл:** `src/app/cms/page.tsx:1-1258`

**Проблема:** Компонент превратился в монолит на ~1.2K строк с десятками `useState`. Одновременно:
- Тянет данные
- Рендерит весь CMS UI
- Управляет модалками

**Последствия:**
- Нарушен принцип single responsibility
- Код тяжело тестировать
- Невозможно переиспользовать
- Любая правка затрагивает весь файл
- Медленные перерендеры

**Решение:** Вынести в отдельные компоненты:
- `PostEditor` — редактор поста
- `PostList` — список постов
- `MetadataPanel` — панель метаданных
- `DeletePostDialog` — модалка удаления
- `SetupGuideModal` — модалка настройки
- `ShortcutsModal` — модалка горячих клавиш

---

### 2. Неиспользуемый modal-root

**Файлы:**
- `src/app/layout.tsx:89-103` — объявлен `<div id="modal-root" />`
- `src/app/cms/page.tsx:942-1254` — модалки рендерятся в `document.body`

**Проблема:**
- Ломает предсказуемость React-деревьев
- Мешает SSR (нет гарантии, что body доступен до mounted)
- Дублируются `mounted`-флаги и `useEffect`

**Решение:**
```tsx
createPortal(content, document.getElementById('modal-root')!)
```

---

### 3. Дублирование модалок

**Файл:** `src/app/cms/page.tsx:942-1254`

**Проблема:** Каждая модалка собирается вручную с инлайновыми стилями. Это привело к:
- «Вытянутой капсуле» — контейнер растягивается на всю высоту
- Дублированию кода центровки
- Несогласованной вёрстке

**Решение:** Создать базовый компонент:
```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Delete Post"
  actions={<Button onClick={handleDelete}>Delete</Button>}
>
  {children}
</Modal>
```

---

### 4. Мёртвый CSS

**Файл:** `src/app/globals.css:681-695`

**Проблема:** Класс `.cms-modal-overlay` описан, но нигде не используется. Вместо него — inline-стили.

**Решение:**
- Удалить мёртвый CSS, или
- Использовать его в новом Modal компоненте

---

### 5. Нарушение доступности (WCAG 2.1 AA)

**Файл:** `src/app/cms/page.tsx:1151-1254` (модалка удаления)

**Проблемы:**
- Не управляет фокусом
- Не блокирует scroll
- Нет `aria-labelledby`, `aria-describedby`
- Нет возврата фокуса после закрытия
- Нет focus trap

**Решение:**
```tsx
// В Modal компоненте:
- role="dialog"
- aria-modal="true"
- aria-labelledby={titleId}
- aria-describedby={descriptionId}
- useFocusTrap() hook
- Возврат фокуса через useRef
- document.body.style.overflow = 'hidden'
```

---

## Roadmap

### Фаза 1: Подключение Sanity (1-2 дня)

| # | Задача | Приоритет | Статус |
|---|--------|-----------|--------|
| 1.1 | Создать Sanity проект | 🔴 Critical | ⬜ |
| 1.2 | Получить Project ID | 🔴 Critical | ⬜ |
| 1.3 | Создать API Token (Manager) | 🔴 Critical | ⬜ |
| 1.4 | Заполнить `.env.local` | 🔴 Critical | ⬜ |
| 1.5 | Проверить подключение | 🔴 Critical | ⬜ |

### Фаза 2: Рефакторинг архитектуры (3-5 дней)

| # | Задача | Приоритет | Статус |
|---|--------|-----------|--------|
| 2.1 | Создать базовый `<Modal>` компонент | 🔴 Critical | ⬜ |
| 2.2 | Вынести `PostList` компонент | 🟡 High | ⬜ |
| 2.3 | Вынести `PostEditor` компонент | 🟡 High | ⬜ |
| 2.4 | Вынести `MetadataPanel` компонент | 🟡 High | ⬜ |
| 2.5 | Создать `usePosts` hook | 🟡 High | ⬜ |
| 2.6 | Создать `useCmsSettings` hook | 🟢 Medium | ⬜ |
| 2.7 | Мигрировать модалки на `<Modal>` | 🟡 High | ⬜ |
| 2.8 | Удалить мёртвый CSS | 🟢 Medium | ⬜ |

### Фаза 3: Доступность (2-3 дня)

| # | Задача | Приоритет | Статус |
|---|--------|-----------|--------|
| 3.1 | Добавить focus trap в Modal | 🔴 Critical | ⬜ |
| 3.2 | Добавить aria-* атрибуты | 🔴 Critical | ⬜ |
| 3.3 | Реализовать возврат фокуса | 🟡 High | ⬜ |
| 3.4 | Блокировка scroll при открытой модалке | 🟡 High | ⬜ |
| 3.5 | Keyboard navigation (Esc, Tab) | 🟡 High | ⬜ |

### Фаза 4: Новый функционал (5-7 дней)

| # | Задача | Приоритет | Статус |
|---|--------|-----------|--------|
| 4.1 | Image Upload (Sanity Assets) | 🔴 Critical | ⬜ |
| 4.2 | Create Post UI + flow | 🔴 Critical | ⬜ |
| 4.3 | Rich Text Editor для body | 🟡 High | ⬜ |
| 4.4 | Category Management CRUD | 🟡 High | ⬜ |
| 4.5 | Real Revision History | 🟢 Medium | ⬜ |
| 4.6 | Author Management | 🟢 Medium | ⬜ |

### Фаза 5: Инфраструктура (2-3 дня)

| # | Задача | Приоритет | Статус |
|---|--------|-----------|--------|
| 5.1 | Deploy Sanity Studio на `/studio` | 🟡 High | ⬜ |
| 5.2 | Настроить Webhooks для ISR | 🟢 Medium | ⬜ |
| 5.3 | Playwright тесты для CMS | 🟢 Medium | ⬜ |
| 5.4 | CI/CD для Sanity schemas | 🟢 Low | ⬜ |

---

## Рекомендации по рефакторингу

### 1. Декомпозиция CMS компонента

```
src/components/cms/
├── CmsPage.tsx              # Главный layout (оркестратор)
├── PostList/
│   ├── PostList.tsx         # Список постов
│   ├── PostListItem.tsx     # Элемент списка
│   └── usePostList.ts       # Hook для фильтрации/поиска
├── PostEditor/
│   ├── PostEditor.tsx       # Редактор
│   ├── MetadataPanel.tsx    # SEO, slug, category
│   └── useAutoSave.ts       # Hook для автосохранения
├── Modals/
│   ├── Modal.tsx            # Базовый компонент
│   ├── DeletePostModal.tsx  # Удаление
│   ├── SetupGuideModal.tsx  # Настройка
│   └── ShortcutsModal.tsx   # Горячие клавиши
└── hooks/
    ├── usePosts.ts          # CRUD операции
    ├── useCmsSettings.ts    # Настройки CMS
    └── useFocusTrap.ts      # Focus management
```

### 2. Базовый Modal компонент

```tsx
// src/components/ui/Modal.tsx
'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md'
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const titleId = `modal-title-${title.toLowerCase().replace(/\s/g, '-')}`;
  const descId = `modal-desc-${title.toLowerCase().replace(/\s/g, '-')}`;

  // Focus trap & restore
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-full ${sizeClasses[size]} p-4 z-[9999]`}
      >
        <div className="bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 id={titleId} className="text-xl font-semibold text-slate-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Content */}
          <div id={descId} className="p-6">
            {children}
          </div>
          {/* Actions */}
          {actions && (
            <div className="flex justify-end gap-3 p-6 border-t bg-slate-50 rounded-b-2xl">
              {actions}
            </div>
          )}
        </div>
      </div>
    </>,
    document.getElementById('modal-root')!
  );
}
```

### 3. Пример использования

```tsx
// DeletePostModal.tsx
import { Modal } from '@/components/ui/Modal';
import { AlertTriangle } from 'lucide-react';

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postTitle: string;
}

export function DeletePostModal({
  isOpen,
  onClose,
  onConfirm,
  postTitle
}: DeletePostModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Post"
      size="sm"
      actions={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Post
          </button>
        </>
      }
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p className="text-slate-600">
            Are you sure you want to delete <strong>"{postTitle}"</strong>?
          </p>
          <p className="text-sm text-slate-500 mt-2">
            This action cannot be undone.
          </p>
        </div>
      </div>
    </Modal>
  );
}
```

---

## Инструкция по настройке

### Шаг 1: Создание Sanity проекта

```bash
# Вариант A: Через CLI
npm create sanity@latest -- --create-project "adapty-blog" --dataset production

# Вариант B: Через веб-интерфейс
# 1. Перейти на https://sanity.io/manage
# 2. Create new project
# 3. Скопировать Project ID
```

### Шаг 2: Создание API Token

1. Открыть [sanity.io/manage](https://sanity.io/manage)
2. Выбрать проект
3. Settings → API → Tokens
4. Add API Token:
   - Name: `adapty-cms-write`
   - Permissions: `Editor` или `Deploy Studio`
5. Скопировать токен (показывается только один раз!)

### Шаг 3: Настройка environment

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=ваш_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=ваш_api_token
```

### Шаг 4: Обновление sanity.config.ts

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'adapty-blog',
  title: 'Adapty Blog CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [deskTool()],
  schema: { types: schemaTypes },
});
```

### Шаг 5: Проверка подключения

```bash
npm run dev
# Открыть http://localhost:3000/cms
# Баннер должен измениться с "Demo mode" на "Connected"
```

---

## Метрики успеха

| Метрика | До | После |
|---------|-----|-------|
| Строк в CMS page.tsx | ~1260 | <300 |
| Количество useState | ~15 | <5 (через hooks) |
| Дублирование модалок | 3x | 0 (1 базовый компонент) |
| WCAG 2.1 AA | ❌ | ✅ |
| Покрытие тестами | 0% | >70% |
| Time to Interactive | TBD | TBD |

---

## Changelog

| Дата | Изменение |
|------|-----------|
| 2025-12-24 | Создан документ |

