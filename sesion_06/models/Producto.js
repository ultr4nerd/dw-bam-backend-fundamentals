const mongoose = require("mongoose");

// Definir un esquema de Producto con validaciones
const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"], // Campo obligatorio
    minlength: [3, "El nombre debe tener al menos 3 caracteres"], // Longitud mínima
    maxlength: [50, "El nombre no debe exceder los 50 caracteres"], // Longitud máxima
    validate: {
      validator: function (v) {
        return !/\d/.test(v); // Verifica que no haya números en el nombre
      },
      message: (props) => `${props.value} no debe contener números`,
    },
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"], // Campo obligatorio
    min: [0, "El precio no puede ser negativo"], // Valor mínimo
    max: [10000, "El precio no puede superar los 10,000"], // Valor máximo
  },
  categoria: {
    type: String,
    enum: ["Electrónica", "Ropa", "Alimentos"], // Solo acepta ciertos valores
    required: [true, "La categoría es obligatoria"],
  },
  enStock: {
    type: Boolean,
    default: true, // Valor por defecto
  },
  fechaCreacion: {
    type: Date,
    default: Date.now, // Valor por defecto al crear un nuevo producto
  },
});

module.exports = mongoose.model("Producto", productoSchema);
