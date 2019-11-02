import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Word } from 'src/app/models/words';
import { StyleProps } from 'src/app/models/styleprops';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';


const mockedText = 'A year ago I was in the audience at a gathering of designers in San Francisco. ' +
  'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
  'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
  'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
  'that modern design problems were very complex. And we ought to need a license to solve them.';

@Injectable()
export class TextService {
  textContent$ = new BehaviorSubject<Word[]>(this.preparePlainText(mockedText));
  selectedWord$ = new BehaviorSubject<Word>(null);


  getMockText() {
    return this.textContent$;
  }

  preparePlainText(text: string): Word[] {
    return text.split(' ').map((word) => new Word(word, new StyleProps()));
  }

  updateWord(word: Word) {
    let style = {};
    word.styleProps.isBold ? style['font-weight'] = 'bold' : style = style;
    word.styleProps.isItalic ? style['font-style'] = 'italic' : style = style;
    word.styleProps.isUnderline ? style['text-decoration'] = 'underline' : style = style;
    word.styleProps.styleObject = style;
    this.selectedWord$.next(word);
    this.textContent$.next(this.textContent$.value);
  }

  setSelectedWord(word: Word) {
    this.selectedWord$.next(word);
  }
}
