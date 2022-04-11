import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthenticateService } from '../authenticate.service';
import { Listing } from '../module/listing.module';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  username?:any;
  role?:any;
  listings?:[Listing];
  loading = true;
  startDate?:Date;
  endDate?:Date;
  hide = false;

  constructor(private apollo: Apollo,private auth: AuthenticateService, private route: Router) { }


  private GET_LISTING = gql`
  query($username: String!) {
    getListings(username:$username) {
      id
      listing_id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }`

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');

    if(this.username){
      this.getListing(this.username);
    }
  }


  getListing(username:String){
    this.apollo
      .query<any>({
        query: this.GET_LISTING,
        variables: {
          username: this.username
        }
      })
      .subscribe(({ data, loading }) => {
        if (data.getListings) {
          this.listings = data.getListings
          this.loading = loading
        }
      });
  }
  book(listing_id:string){
    let booking_id = this.username + listing_id;
    console.log(this.startDate)
  }

  showDatePicker(){
    this.hide = true;
  }

}
