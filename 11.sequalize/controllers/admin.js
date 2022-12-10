const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  // Product.create({
  //   title ,
  //   userId: req.user.id
  // }) OR

  //this method will be created when yspecific relation of to tables in app.js
  req.user.createProduct({
    title ,
    userId: req.user.id
  })
  .then(result => {
    console.log(result)
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findByPk(prodId)
  req.user.getProducts({where: { id: prodId }})
  .then(products => {
    const product = products[0]
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.save()
    })
    .then(res => console.log('Product Updated!'))
    .catch(err => console.log(err));
  
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findByPk(prodId)
  //   .then(product => {
  //     product.destroy();
  //     res.redirect('/admin/products');
  //   })
  //   .then(res => console.log('Product Deleted!'))
  //   .catch(err => console.log(err));

    Product.destroy({ where: { id: prodId} })
    .then(res => console.log('Product Deleted!'))
    .catch(err => console.log(err));

    res.redirect('/admin/products');
};
