import express from 'express';

const app = express();
app.use(express.json());


let cart = [];


app.get("/cart", (req, res) => {
    res.send(cart);
});

app.post("/cart/add", (req, res) => {
    const { item } = req.body;
    if (item) {
        cart.push(item);
        res.status(201).send({ message: 'Item added', cart });
    } else {
        res.status(400).send({ message: 'Item is required' });
    }
});

app.post("/cart/del", (req, res) => {
    const { item } = req.body;
    if (item) {
        const itemExists = cart.includes(item);
        cart = cart.filter(cartItem => cartItem !== item);
        res.send({ message: itemExists ? 'Item removed' : 'Item not found', cart });
    } else {
        res.status(400).send({ message: 'Item is required' });
    }
});



app.listen(3000, () => console.log("Server is up and running....."));



