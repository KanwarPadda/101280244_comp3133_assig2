import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Booking } from '../module/booking.module';
import { User } from '../module/user.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username?:any;
  bookings?:[Booking];
  loading = true;

  private GET_BOOKINGS = gql`
  query($username: String!) {
    getBookings(username: $username) {
      listing_id
      booking_id
      booking_start
      booking_end
      username
  }
  }`

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if(this.username){
      this.getBookings();
    }
  }

  getBookings(){
    this.apollo
      .query<any>({
        query: this.GET_BOOKINGS,
        variables: {
          username: this.username
        }
      })
      .subscribe(({ data, loading }) => {
        console.log(data)
        if (data.getBookings) {
          this.bookings = data.getBookings
          this.loading = loading
        }
      });
  }

}
