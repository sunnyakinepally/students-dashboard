import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  history: any;
  historylist: any;
  ngOnInit(): void {
this.getsearchdata()

}

getsearchdata(){
  this.history = localStorage.getItem('searchitems')
    this.historylist = JSON.parse(this.history)
    console.log("history coming",this.historylist)
}

deleteresult(id:any){
  console.log("selected id",id)
  window.location.reload()
  const index: number=this.historylist.indexOf(id)
  console.log("selected id",index)
this.historylist.splice(this.historylist.indexOf(id),1)
localStorage.setItem('searchitems',JSON.stringify(this.historylist))
// console.log("afterdeletion",this.historylist)

}

}
