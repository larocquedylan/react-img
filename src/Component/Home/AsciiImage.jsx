import React, { useRef, useEffect } from 'react';

const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
const pixelSize = 1;

const AsciiImage = ({ imageSrc, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    const drawAsciiImage = async () => {
      const photo = await loadImage(imageSrc);
      const resizedWidth = photo.width / pixelSize;
      const resizedHeight = photo.height / pixelSize;

      canvas.width = width;
      canvas.height = height;
      const w = width / resizedWidth;
      const h = height / resizedHeight;

      ctx.drawImage(photo, 0, 0, resizedWidth, resizedHeight);
      const photoData = ctx.getImageData(0, 0, resizedWidth, resizedHeight);

      ctx.fillStyle = 'rgba(0, 0, 230, 1)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < resizedWidth; i++) {
        for (let j = 0; j < resizedHeight; j++) {
          const pixelIndex = (i + j * resizedWidth) * 4;
          const r = photoData.data[pixelIndex + 0];
          const g = photoData.data[pixelIndex + 1];
          const b = photoData.data[pixelIndex + 2];

          const brightness = (r + g + b) / 3;
          const character = mapBrightnessToCharacter(brightness);

          const fillColor =
            brightness > 128
              ? `rgba(0, 0, ${255 - (brightness - 128) * 2}, 1)`
              : 'rgba(255, 255, 255, 1)';
          ctx.fillStyle = fillColor;

          ctx.font = '7.41px monospace';
          ctx.fillText(character, i * w, j * h);
        }
      }
    };

    const mapBrightnessToCharacter = (brightness) => {
      const index = Math.floor(map(brightness, 0, 169, density.length, 0));
      return density.charAt(index);
    };

    const map = (value, start1, stop1, start2, stop2) => {
      return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    };

    drawAsciiImage();
  }, [imageSrc, width, height]);

  return (
    <canvas className='flex justify-center align-middle' ref={canvasRef} />
  );
};

export default AsciiImage;
