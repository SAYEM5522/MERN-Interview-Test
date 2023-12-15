import mongoose from "mongoose"
// Shape schema
const shapeSchema = new mongoose.Schema({
  name:{type:String},
  drowing:[{
    type: { type: String, enum: ['line', 'circle', 'rectangle',], required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  }],
});

// Shape model
const Shape = mongoose.model('Shape', shapeSchema);

export {Shape}
