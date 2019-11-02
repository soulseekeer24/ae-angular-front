import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text-service/text.service';
import { Word } from 'src/app/models/words';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {

  words$: any;

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.setUp();

  }
  setUp() {
    this.words$ = this.textService.getMockText();
  }

  onClick(word: Word) {
    this.textService.setSelectedWord(word);
  }
}
