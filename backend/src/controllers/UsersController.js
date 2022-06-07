// traer el modelo de datos
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

// Mostrar los productos creados en la BD
const getUsers = async (req, res) => {
  const users = await User.find();
  //console.log(req.params, req.query)
  res.status(200).json(users);
};

const getOneUser = async (req, res) => {
  const friday = "friday";
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    res.status(200).json(user ? user : "El producto no existe");
  } catch (error) {
    res.status(200).json({ msj: "Error al consultar el id", error });
  }
  friday = "saturday";
};

// Crear un producto en la base de datos
const createUsers = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    //const mail = await mailSender(req.body.email)

    res.status(201).json({ status: "Usuario creado correctamente", mail });
    //throw
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Usuario no creado correctamente", error });
  }
};

const mailSender = async (mailTo) => {

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  //Sender to mail
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to: `${mailTo}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
   //html: "<b>Hello world?</b>", // html body
  });

  transporter.sendMail(info, (err, data) => {
    return err ? "Error" : 'Correo enviado'
  })


}

const validateEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const validated = await User.findByIdAndUpdate(id, {
      $set: { verified: true },
    });
    res.status(201).json({msg:'Usuario verificado'});
  } catch (error) {
    console.log(error);
  }
};

// Actualizar un producto en la base de datos
const updateUsers = async (req, res) => {
  try {
    const id = req.params.userId;
    const updated = await User.findByIdAndUpdate(id, { $set: req.body });
    res.status(201).json(updated);
  } catch (error) {
    res.status(201).json({ msj: "Actualizacion fallida", error });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  await User.findByIdAndDelete(id);
  res.status(200).json({ msj: "Usurio eliminado" });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === "" || password === "")
      throw "Uno o mas campos estan vacios";

    const user = await User.findOne({ username });

    if (user) {
      if (password === user.password) {
        // generar token

        const {
          _id,
          email,
          name,
          lastname,
          document,
          salary,
          arlType,
          compensationBox,
          password,
          phone,
          username,
          admin,
          verified,
          isActive,
          eps
        } = user;

        const token = jwt.sign(
          {
            _id,
            email,
            name,
            lastname,
            document,
            salary,
            arlType,
            compensationBox,
            password,
            phone,
            username,
            admin,
            verified,
            isActive,
            eps
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2h" }
        );

        return res.status(200).json({ status: "Sesion iniciada", token });
      }

      throw "Usuario y/o contraseña incorrectos";
    }

    throw "Usuario y/o contraseña incorrectos";
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUsers,
  updateUsers,
  deleteUser,
  login,
  validateEmail,
};
