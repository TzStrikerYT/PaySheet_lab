const { application } = require("express");
const express = require("express");
const router = express.Router();

// -- importemos el controlador que nos trae las funciones
const paymentsControllers = require("../controllers/PaymentsConroller");
const auth = require("../middlewares/auth")

router.get("/generate", paymentsControllers.generatePayments)
router.get("/payEmployes", paymentsControllers.payEmployes)
router.get('/getByFilter/:filter', paymentsControllers.getEmployesByfilter)

// router.get("/get-products", /*auth,*/ productsControllers.getProducts);
// router.post("/create-product", auth, productsControllers.createProducts);
// router.post("/create-many-products", auth, productsControllers.manyProducts);
// router.put("/update-product/:productId", auth, productsControllers.updateProducts)
// router.get("/get-one-product/:productId", auth, productsControllers.getOneProduct)
// router.delete("/delete-product/:productId", auth, productsControllers.deleteProduct)

module.exports = router;