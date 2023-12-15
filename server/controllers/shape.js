import { Shape } from "../db/shape.js";

export const createDrowing = async (req, res) => {
  const shapes = req.body.data;

  try {
    // Find the last created document to determine the next drawing number
    const lastDrawing = await Shape.findOne({}, {}, { sort: { _id: -1 } });
    let name="Drawing 1"
    if (lastDrawing && lastDrawing.name) {
      // Extract the number from the last drawing's name
      const match = lastDrawing.name.split(" ");
      if (match && match[1]) {
        name = `Drawing ${parseInt(parseInt(match[1])+1)}`;
      }
    }

    // Create a new shape document with the updated drawing name and shapes array
    const shapeDocument = new Shape({
      name,
      drowing: shapes.map(({ type, data }) => ({ type, data })),
    });

    // Save the shape document to the database
    await shapeDocument.save();

    res.status(200).send('Shapes saved successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


 export const updateDrowing=async(req,res)=>{
  const updates = req.body.data;

  const { id } = req.params;

  try {
    // Find the drawing by name
    const drawing = await Shape.findOne({ _id:id });

    if (!drawing) {
      return res.status(404).send(`Drawing with name ${id} not found.`);
    }

    // Update the drawing's shapes
    drawing.drowing = updates.map(({ type, data }) => ({ type, data }));

    // Save the updated drawing
    await drawing.save();

    res.status(200).send('Drawing updated successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
 }
 export const deleteDrowing=async(req,res)=>{
  const { id } = req.params;

  try {
    // Find the shape by ID and delete it
    const result = await Shape.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send('Shape not found.');
    }

    res.status(200).send('Shape deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
 }

 export const getAllDrowing=async(req,res)=>{
  try {
    // Retrieve all shapes from the database
    const shapes = await Shape.find();
    res.status(200).json(shapes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
 }

 export const getDrowing=async(req,res)=>{
  const { id } = req.params;

  try {
    // Find the shape by ID
    const shape = await Shape.findById(id);

    if (!shape) {
      return res.status(404).send('Shape not found.');
    }

    res.status(200).json(shape);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
 }