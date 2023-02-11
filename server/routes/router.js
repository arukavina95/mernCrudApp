const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

const basePriceJson = [
  { amount: 1000, city: "Zagreb" },
  { amount: 950, city: "Split" },
  { amount: 900, city: "Rijeka" },
  { amount: 900, city: "Osijek" },
  { amount: 800, city: "Zadar" },
  { amount: 700, city: "other" },
];

const discountJson = [
  { discount: 20, age: "0-20" },
  { discount: 10, age: "20-30" },
  { discount: 5, age: "30-40" },
  { discount: 2, age: "40-60" },
  { discount: 0, age: "60-200" },
];

//register user

router.post("/register", async (req, res) => {
  /* console.log(reg.body); */
  const { name, email, city, birthDate } = req.body;

  if (!name || !email || !city || !birthDate) {
    res.status(422).json("Molim popunite polja!");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("Korisnik je vec dodan!");
    } else {
      const adduser = new users({
        name,
        email,
        city,
        birthDate,
      });
      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

//get userdata

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get individual user

//dohvacanje usera po idu,

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    let userindividual = await users.findById({ _id: id });
    const userCity = userindividual.city; // Zagreb
    // godine racunjanje(preko splita)
    let age = calculateAge(userindividual.birthDate);
    //popust
    let discount = calculateDiscount(age);

    const basePrice = basePriceJson.find((x) => x.city == userCity).amount; //  { amount: 900, city: "Rijeka" },

    const insurancePrice = basePrice - basePrice * (discount / 100);

    let returnValue = {
      insurancePrice: insurancePrice,
      name: userindividual.name,
      email: userindividual.email,
      city: userindividual.city,
      birthDate: userindividual.birthDate,
      id: userindividual.id,
    };

    console.log(userindividual);
    res.status(201).json(returnValue);
  } catch (error) {
    res.status(422).json(error);
  }
});

//update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});
//delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await users.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get base prices
router.get("/get-base-prices", async (req, res) => {
  try {
    return res.status(201).json(basePriceJson);
  } catch (error) {
    res.status(422).json(error);
  }
});
// get discount
router.get("/get-discount", async (req, res) => {
  try {
    return res.status(201).json(discountJson);
  } catch (error) {
    res.status(422).json(error);
  }
});
//racunanje godina
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

//date format

//racunanje popusta

const calculateDiscount = (age) => {
  let discount = 0;
  for (const item of discountJson) {
    const ageRange = item.age.split("-");
    const minAge = parseInt(ageRange[0]);
    const maxAge = parseInt(ageRange[1]);
    if (age >= minAge && age <= maxAge) {
      discount = item.discount;
      break;
    }
  }
  return discount;
};

module.exports = router;
