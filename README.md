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