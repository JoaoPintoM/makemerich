const cheerio = require('cheerio')
import { getArchives } from './requests/index'
import { mockUrls } from './helpers/mockUrls'

import { interval } from 'rxjs/observable/interval'
import { from } from 'rxjs/observable/from'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { zip } from 'rxjs/observable/zip'
import { map, take, toArray, tap, switchMap } from 'rxjs/operators'

const getArchivesUrls = async () => {
  // const archivesHTML = await getArchives()
  // const $ = cheerio.load(archivesHTML)
  // const a = $('.maintable a')
  //
  // const urls = []
  // a.each((i, x) => urls.push($(x).attr('href')))
  // return urls.filter(x => x.indexOf('archive') === -1)

  return Promise.resolve(mockUrls)
}

const getPage = async ([token]) => {
  return Promise.resolve('ok')
}

getArchivesUrls()
  .then((r) => {
    zip(from(r), interval(100))
    .pipe(
      switchMap(getPage),
    )
    .subscribe(value => {
      console.log(value)
    }, () => {}, () => console.log('completed'))
}).catch(e => console.log(e))
