export const drawLine = (context, startX, startY, endX, endY) => {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
};