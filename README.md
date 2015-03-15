# NodeJS Image Uploader
Simple Single Image, or Multiple Image Uploader. Using Nodejs and Expressjs

# How To

1. Make sure you have NodeJS installed.
2. Install Express
   `npm install express -g`
3. Install Node FS Library
  `npm install node-fs -g`
4. Install any additional node packages by running 
  `npm install` 
5. Change directory paths to where you want images to save in `/app.js` file.
6. Cd into directory, type `node app.js` to run node application
7. Create POST forms on html to /single-image to upload a single image, or /multiple-images for sending more than one.

# Example

# Single Image

`<form action="/single-image" method="POST" >
  <input type="file" name="file" accept="image/*">
  <button type="submit">Submit</button>
</form>`

# Multiple Image

`<form action="/multiple-images" method="POST" >
  <input type="file" name="file" accept="image/*" multiple>
  <button type="submit">Submit</button>
</form>`
  
