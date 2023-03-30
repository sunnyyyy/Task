import './App.css';
import data from './MarathonResults.json';

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  TableSortLabel,
  Paper,
  
} from '@mui/material';
import React, { useEffect, useState } from "react";



function App() {
  
  const posts = data.results.athletes;
  const description = data.results;
  const [rowData, setRowData] = useState(posts);
  const [orderDirection1, setOrderDirection1] = useState("desc");
  const [orderDirection2, setOrderDirection2] = useState("desc");

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
  
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }
  const exportToCsv = e => {
    e.preventDefault();
  
    // Headers for each column
    let usersCsv = 'Rank, Full Name, Finish Time, Country \n';
    // Convert users data to a csv

    posts.forEach(item => { 
      usersCsv += `${item.rank}, ${item.firstname} ${item.surname}, ${item.finishtime}, ${item.countryname}\n`
    })

    // for (let i = 0; i < posts.length; i++) { 
    //   usersCsv +== `${posts}`
    // }

    // for(var i in posts)
    //   usersCsv.push([posts[i].rank, posts[i].firstname, posts[i].surname, posts[i].finishtime,posts[i].countryname].join(','));

  
    downloadFile({
      data: usersCsv,
      fileName: 'race_results.csv',
      fileType: 'text/csv',
    })
  }
  
  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.rank < b.rank ? 1 : b.rank < a.rank ? -1 : 0
        );
    }
  };
  const sortArray2 = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        const array = arr.sort((a, b) =>
        a.bibnumber > b.bibnumber ? 1 : b.bibnumber > a.bbinumber ? -1 : 0);
        const newarray = array.reverse();
        return newarray;
      case "desc":

        return arr.sort((a, b) =>
          a.bibnumber < b.bibnumber ? 1 : b.bibnumber < a.bibnumber ? -1 : 0
        );
    }
  };
   
  const handleSortRequest1 = () => {
    setRowData(sortArray(posts, orderDirection1));
    setOrderDirection1(orderDirection1 === "asc" ? "desc" : "asc");
  };
  const handleSortRequest2 = () => {
    setRowData(sortArray2(posts, orderDirection2));
    setOrderDirection2(orderDirection2 === "asc" ? "desc" : "asc");
  };
  

  return (
      <div className='container' class='items-center'>
        <div className='info' class='text-center text-font-yellow'>
        <img src='cover.png' className='cover'></img>
        <h1 class="text-3xl font-bold underline text-center">{data.results.racename}</h1>
        <p class="pt-6">Race Status: {data.results.raceStatus} </p>
        <p>Gender: {data.results.gender} </p>
        <p>Race Lenength: {data.results.racelength} </p>
        <p>Tod:{data.results.tod} </p>
        <p class='pb-4'>Last updated:{data.results.lastupdated} </p>
        <button class="rounded-full text-gray-900 bg-font-yellow py-2.5 px-5 mr-2 mb-2 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10" onClick={exportToCsv}>
          Export to CSV
        </button>
        </div>
        <div className='posts' class='p-8'>
        <TableContainer component={Paper}>
     <Table aria-label="simple table" >
       <TableHead>
         <TableRow >
           <TableCell onClick={handleSortRequest1}>
           <TableSortLabel active={true} direction={orderDirection1}>
            Rank
            </TableSortLabel>
            </TableCell>
           <TableCell align="right">firstname</TableCell>
           <TableCell align="right">surname</TableCell>
           <TableCell align="right">athletes id</TableCell>
           <TableCell align="right">finishtime</TableCell>
           <TableCell align="right">raceprogree</TableCell>
           <TableCell align="right">teamname</TableCell>
           <TableCell align="right" onClick={handleSortRequest2}>
           <TableSortLabel align="right" active={true} direction={orderDirection2}>
           bibnumber
           </TableSortLabel>
           </TableCell>
           <TableCell align="right">flag</TableCell>
           <TableCell align="right">countryname</TableCell>

         </TableRow>
       </TableHead>
       <TableBody>
       {posts.map((post) => (
           <TableRow key={post.rank}>
             <TableCell component="th" scope="row">
               {post.rank}
             </TableCell>
             <TableCell align="right">{post.firstname}</TableCell>
             <TableCell align="right">{post.surname}</TableCell>
             <TableCell align="right">{post.athleteid}</TableCell>
             <TableCell align="right">{post.finishtime}</TableCell>
             <TableCell align="right">{post.raceprogress}</TableCell>
             <TableCell align="right">{post.teamname}</TableCell>
             <TableCell align="right">{post.bibnumber}</TableCell>
             <TableCell align="right">{post.flag}</TableCell>
             <TableCell align="right">{post.countryname}</TableCell>

           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 
        </div>

      </div>
    
  );
}

export default App;
