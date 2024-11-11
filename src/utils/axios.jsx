import axios from 'axios'
  const instance  = axios.create({ 
     baseURL: "https://api.themoviedb.org/3/",  
     headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGY3ZWVjNjM0YjcxYTJhYjVmOTE1N2YyNWVlYmUzYiIsIm5iZiI6MTczMDEwOTA4NC41NjUwOTYsInN1YiI6IjY3MWY1YjRmMjY4NWNiNjU2M2MxNDZmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PKrkC0vClTEI-a0g0Dz5gkPZbsh7k7EA-l1LNSKOuyM'
      }
  })
  export default instance