import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationPipe } from './pagination/pagination.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { ChatPersonSearchPipe } from './search/chat-person-search.pipe';
import { UserSearchPipe } from './search/user-search.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { MailSearchPipe } from './search/mail-search.pipe';
import { PosteSearchPipe } from './search/poste-search.pipe';
import { EmployeSearchPipe } from './search/employe-search.pipe';
import { JsonParsePipe } from 'src/app/@common/pipes/json-parse.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PaginationPipe,
    ProfilePicturePipe,
    ChatPersonSearchPipe,
    UserSearchPipe,
    EmployeSearchPipe,
    PosteSearchPipe,
    TruncatePipe,
    MailSearchPipe,
  ],
  exports: [
    PaginationPipe,
    ProfilePicturePipe,
    ChatPersonSearchPipe,
    UserSearchPipe,
    EmployeSearchPipe,
    PosteSearchPipe,
    TruncatePipe,
    MailSearchPipe,
  ],
})
export class PipesModule {}
