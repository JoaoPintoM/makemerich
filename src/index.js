const cheerio = require('cheerio')
import {from} from 'rxjs/observable/from'
import {interval} from 'rxjs/observable/interval'
import {zip} from 'rxjs/observable/zip'
import {switchMap, switchMapTo, tap} from 'rxjs/operators'
import {BehaviorSubject} from 'rxjs/Rx';
import {mockUrls} from './helpers/mockUrls';


const launcher = new BehaviorSubject();

const getArchivesUrls = async () => {
  // const archivesHTML = await getArchives()
  // const $ = cheerio.load(archivesHTML)
  // const a = $('.maintable a')
  //
  // const urls = []
  // a.each((i, x) => urls.push($(x).attr('href')))
  // return urls.filter(x => x.indexOf('archive') === -1)

  return Promise.resolve(mockUrls)
};

const getPage = async ([token]) => {
  return Promise.resolve('ok')
};

const getArchive = (archivesUrl) => zip(from(archivesUrl), interval(100))
  .pipe(
    switchMap(getPage),
  );

const getArchivesUrls$ = from(getArchivesUrls())
  .pipe(
    switchMap(getArchive),
    tap((next) => {
      }, (err) => {
      },
      () => launcher.next('Next round')
    )
  );


launcher
  .asObservable()
  .pipe(
    switchMapTo(getArchivesUrls$)
  )
  .subscribe(
    value => {
      console.log(value)
    },
    (err) => {
    },
    () => {
    }
  );