# Table of contents
- [Table of contents](#table-of-contents)
- [Tech store](#tech-store)
- [Technologies](#technologies)
- [Demo](#demo)
- [Project overview](#project-overview)
    - [Catalog page](#catalog-page)
    - [Details page](#details-page)
    - [Reviews](#reviews)
    - [Register page](#register-page)
    - [Create page](#create-page)
    - [Edit page](#edit-page)
    - [Cart page](#cart-page)
    - [Shipping details](#shipping-details)
    - [Order summary](#order-summary)
    - [My orders page](#my-orders-page)
    - [My listings](#my-listings)
    - [My sales](#my-sales)
- [TODO LIST](#todo-list)

# Tech store
An e-commerce app which allows users to publish their own products for sale or order already published ones. Each product owner can edit/delete his post and check if any of his products have been purchased. Also, each user can make reviews on products, which means to comment and rate an existing product.

# Technologies
 - React
 - Redux Toolkit
 - Material UI
 - Node with Express JS
 - MongoDB

# Demo
[Link](https://tech-store-new.netlify.app/)
FE is deployed on Netlify, BE on Heroku

# Project overview

### Catalog page
![catalog page](https://www.dropbox.com/s/3dsuhz8qrjyo325/catalog.png?raw=1)

Provides a view for all listings, you can search, sort by category and other options. Also depending whether you are logged in or not, pages have different options available.

### Details page
![details page](https://www.dropbox.com/s/wwys49nejwhrj46/details_owner.png?raw=1)

Has description of the selected item, on the screenshot is the owner view, so owner can edit and delete his offer. If user isn't owner and is logged in can purchase the selected item.

### Reviews
![reviews](https://www.dropbox.com/s/d942nfn1c5tk3ts/reviews.png?raw=1)

On the details page of a selected item logged in users can write a review for it.

### Register page
![register](https://www.dropbox.com/s/gxuabcuxjheh2nk/register.png?raw=1)

Simple regsiter form.

### Create page
![create](https://www.dropbox.com/s/8hj12oa3trh1539/create.png?raw=1)

Create offer and showing example error handling.

### Edit page
![edit page](https://www.dropbox.com/s/qqi6vqe4nvo83mn/edit.png?raw=1)

Owner can edit his listing by following provided validations.

### Cart page
![cart](https://www.dropbox.com/s/dd8lsz1xny8bmvy/my-cart.png?raw=1)

After selecting couple items thats the 1st step of the purchasing process.

### Shipping details
![ship details](https://www.dropbox.com/s/o6ukhynzxi4kj8x/shipping-details.png?raw=1)

Followed by providing your details.

### Order summary
![summary](https://www.dropbox.com/s/7aoia9iw5rbc29s/order-summary.png?raw=1)

Last stage before purchasing, you need to confirm the details.

### My orders page
![my orders](https://www.dropbox.com/s/ge5bembxxorol8s/my-orders.png?raw=1)

You can check your orders.

### My listings
![my listings](https://www.dropbox.com/s/mmuz1z5qkqzo9c4/my-listings.png?raw=1)

User current listings.

### My sales
![my sales](https://www.dropbox.com/s/kcn3hh3ku4luyhg/my-sales.png?raw=1)

User can confirm his pending item sales.

# TODO LIST
- [x] Authentication with JWT
- [x] Main page template
- [x] add create item template
- [x] add create item functionality
- [x] Create page
- [x] add get all posts functionality
- [x] test data
- [x] Details page template
- [x] Details page functionality
- [x] add cart template
- [x] add get cart FE/BE
- [x] add insert into cart FE/BE
- [x] add increase/decrease quantity functionality
- [x] add delete from cart FE/BE
- [x] add stages to cart component
- [x] add shipping details template
- [x] add shipping details functionality
- [x] add review order to purchase template
- [x] add complete order template
- [x] add place order functionality FE/BE
- [x] add order slice
- [x] add order controller/service
- [x] add my orders page template
- [x] add my orders page functionality
- [x] sort
- [x] search
- [x] change verify token to the async version
- [x] refactor code to remove express-validator
- [x] add creatorId to products
- [x] add my listings page template
- [x] allow owner to edit/delete his listing
- [x] add success notifications
- [x] add sale model
- [x] make individual sale document to each product to notify owner when user orders
- [x] add salesSlice
- [x] add sales controller/service
- [x] add my sales page template
- [x] make send product functionality in userSales
- [x] create jsonRequest function to remove repeated code
- [x] implement refresh token functionality FE/BE
- [x] adjust token to be kept in local storage or cookie
- [x] Check each component behaviour with the persisting auth
- [x] fix on reload to fetch all items in store
- [x] add create review template in details page
- [x] add all reviews template in details page
- [x] add reviews controller, model, service 
- [x] add reviews slice, api
- [x] add debounce on search items
- [x] allow review owner to delete his comment
- [x] add average rating for product in details page
- [x] add error boundary (one reason is if jwt_decode (App component) is used with non valid token or other data type)
- [x] fix error messages in create/edit
- [x] add FE pagination
- [x] change Product model to have timestamps and give sort option to newest -> oldest
- [x] change edit/create item validation
- [ ] change login/register validation