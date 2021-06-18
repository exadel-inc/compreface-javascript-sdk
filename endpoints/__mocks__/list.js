const images = {
    image_id: "6b135f5b-a365-4522-b1f1-4c9ac2dd0728",
    subject: "subject1",

    image_id: "6b135f5b-a365-4522-b1f1-4c9ac2dd0728",
    subject: "subject2",
  }

  const list = (url, api_key) => {
      return new Promise((resolve, reject) => {
          process.nextTick(() => {
            url && api_key 
                ? resolve(JSON.stringify(images))
                : reject({ error: "Something went wrong" })
          })
      })

  }

  export default list;