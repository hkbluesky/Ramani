import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
  const res = await fetch('https://itunes.apple.com/lookup?id=909253&entity=album&limit=10')
  const data = await res.json()
  const dataset = data.results.slice(1, data.results.length)

  const allPostsData = dataset.map((result) => ({
    collectionId: result.collectionId,
    collectionName: result.collectionName,
    collectionViewUrl: result.collectionViewUrl,
    collectionPrice: result.collectionPrice,
    artworkUrl60: result.artworkUrl60,
    releaseDate: result.releaseDate
    }))
  
  return allPostsData.sort((a, b) => {
    if (a.releaseDate < b.releaseDate) {
      return 1
    } else {
      return -1
    }
  })

  //return results
  //return id
}

export async function getAllPostIds() {
  const res = await fetch('https://itunes.apple.com/lookup?id=909253&entity=album&limit=10')
  const data = await res.json()
  const dataset = data.results.slice(1, data.results.length)
    
  
   const paths_result=dataset.map(dataset_single => {
    return {
      params: {
        id: dataset_single.collectionId + ''
      }
    }
  })

  return paths_result;

}

export async function getPostData(id) {
  /*
  const fullPath = path.join(postsDirectory, `${id}.md`)
  */
  //const fullPath = 
  const res = await fetch('https://itunes.apple.com/lookup?id='+ id)
  const data = await res.json()
  const dataset = data.results[0]
  return dataset


}
