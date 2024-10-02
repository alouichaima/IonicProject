import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  onboardingScreens = [
    { image: '1.jpg' },
    { image: '2.jpg' },
    { image: '3.jpg' },
  ];

  swiperConfig: SwiperOptions = {
    pagination: { clickable: true },
    autoplay: { delay: 3000 },
    loop: true,
    keyboard: true,
  };
swiperModules: any;

  constructor() {}

  ngOnInit() {}
}
