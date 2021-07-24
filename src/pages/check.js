const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const getText = () => {
  const number1 = randomInteger(1, 12);
  const number2 = randomInteger(1, 12);
  const text = `${number1} + ${number2} =`;
  return { result: number1 + number2, text };
};

export const drawImage = (ctx, width, height, text) => {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#F2F2F2';
  ctx.fillRect(0, 0, width, 80);
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.strokeStyle = '#777';
  for (let i = 1; i <= 7; i++) {
    ctx.moveTo(0, 10 * i + randomInteger(1, 10));
    ctx.lineTo(width, 10 * i - randomInteger(1, 10*i));
    ctx.stroke();
  }

  ctx.font = '40px serif';
  ctx.textBaseline='top';
  const textWidth = ctx.measureText(text).width;
  const start = (width - textWidth) / 2;
  ctx.rotate(Math.PI / 30);
  ctx.strokeText(text, start, 9);
  ctx.rotate(-Math.PI / 30);
};
