// traer el modelo de datos
const User = require("../Models/User");
const env = require("dotenv");
env.config();

// // Mostrar los productos creados en la BD
// const getUsers = async (req, res) => {
//   const users = await User.find();
//   //console.log(req.params, req.query)
//   res.status(200).json(users);
// };

const generatePayments = async (req, res) => {
  try {
    const user = await User.updateMany(
      { paymentState: "payed", isActive: true },
      { $set: { paymentState: "ready" } }
    );
    res.status(200).json({ msg: "Nominas generadas correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msj: "Error al generar nominas", error });
  }
};

const payEmployes = async (req, res) => {
  try {
    const user = await User.updateMany(
      { paymentState: "ready", isActive: true },
      { $set: { paymentState: "payed" } }
    );
    res.status(200).json({ msg: "Pago realizado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msj: "Error al generar nominas", error });
  }
};

const getEmployesByfilter = async (req, res) => {
  try {
    const filter = req.params.filter;
    let users;

    if (filter === "ready") {
      users = await User.find({$and: [{paymentState: 'ready'}, {isActive: true}]})
    }

    if (filter === "payed") {
      users = await User.find({$and: [{paymentState: 'payed'}, {isActive: true}]});
    }

    res.status(200).json({ users });
  } catch (error) {
      console.log(error)
    res.status(400).json({ error });
  }
};

// // Crear un producto en la base de datos
// const createUsers = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();

//     //const mail = await mailSender(req.body.email)

//     res.status(201).json({ status: "Usuario creado correctamente", mail });
//     //throw
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ status: "Usuario no creado correctamente", error });
//   }
// };

// // Actualizar un producto en la base de datos
// const updateUsers = async (req, res) => {
//   try {
//     const id = req.params.userId;
//     const updated = await User.findByIdAndUpdate(id, { $set: req.body });
//     res.status(201).json(updated);
//   } catch (error) {
//     res.status(201).json({ msj: "Actualizacion fallida", error });
//   }
// };

// const deleteUser = async (req, res) => {
//   const id = req.params.userId;
//   await User.findByIdAndDelete(id);
//   res.status(200).json({ msj: "Usurio eliminado" });
//};

module.exports = {
  generatePayments,
  payEmployes,
  getEmployesByfilter,
};
