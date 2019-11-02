import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { TextService } from 'src/app/services/text-service/text.service';
import { Word } from 'src/app/models/words';
import { Subscription, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { DatamuseService } from 'src/app/services/datamuse-setvice/datamuse.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent implements OnInit, OnDestroy {

  selectedWord$: BehaviorSubject<Word>;
  synonyms$ = new BehaviorSubject<string[]>([]);
  disabledEditOptions = false;
  selectedWord: Word = null;
  subscriptionWord: any;

  constructor(private datamuseService: DatamuseService
    , private textService: TextService) {

  }
  ngOnInit(): void {

    this.selectedWord$ = this.textService.selectedWord$;
    this.subscriptionWord = this.selectedWord$.subscribe((res) => {
      this.selectedWord = res;
      if (this.selectedWord != null) {
        this.getSynonyms(this.selectedWord.content);
      }
    });
  }

  getSynonyms(word: string) {
    this.datamuseService.getSynonyms(word.replace(/[^a-zA-Z ]/g, ' ')).subscribe((words) => this.synonyms$.next(words.map(s => s.word)));
  }

  changeWord(newWord: string) {
    this.selectedWord.content = newWord;
    this.textService.updateWord(this.selectedWord);
  }

  applyStyle(propertyName: string, status: boolean) {
    this.selectedWord.styleProps[propertyName] = status;
    this.textService.updateWord(this.selectedWord);

  }
  ngOnDestroy(): void {
    this.selectedWord$.unsubscribe();
    this.synonyms$.unsubscribe();
  }

}
