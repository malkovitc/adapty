'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
import { memo } from 'react';

interface AnimatedGradientProps {
  colors?: {
    color1?: string;
    color2?: string;
    color3?: string;
  };
  speed?: number;
  brightness?: number;
  className?: string;
}

const AnimatedGradient = memo<AnimatedGradientProps>(({
  colors = {
    color1: '#8B5CF6',
    color2: '#3B82F6',
    color3: '#10B981',
  },
  speed = 1,
  brightness = 1.2,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <ShaderGradient
          control='query'
          urlString={`https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=${brightness}&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=${encodeURIComponent(colors.color1 || '#8B5CF6')}&color2=${encodeURIComponent(colors.color2 || '#3B82F6')}&color3=${encodeURIComponent(colors.color3 || '#10B981')}&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.3&uFrequency=5.5&uSpeed=${speed}&uStrength=2.4&uTime=0&wireframe=false`}
        />
      </ShaderGradientCanvas>
    </div>
  );
});

AnimatedGradient.displayName = 'AnimatedGradient';

export default AnimatedGradient;
