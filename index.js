const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err.message);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject(err.message);
      resolve('done...');
    });
  });
};

fetDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`bread: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('img-dog.txt', res.body.message);
  } catch (err) {
    console.log(err.message);
  }
};

fetDogPic();

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`bread: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })

//   .then(res => {
//     console.log(res.body.message);
//     writeFilePro('img-dog.txt', res.body.message);
//   })

//   .then(() => {
//     console.log('random dog image saved corectly ....');
//   })

//   .catch(err => console.log(err.message));
