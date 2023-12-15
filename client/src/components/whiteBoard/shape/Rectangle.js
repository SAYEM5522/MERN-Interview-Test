export const drawRectangle = (context, startX, startY, endX, endY) => {
  context.beginPath();
  context.rect(startX, startY, endX - startX, endY - startY);
  context.stroke();
};