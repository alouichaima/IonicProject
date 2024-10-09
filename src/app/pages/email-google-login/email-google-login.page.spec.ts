import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailGoogleLoginPage } from './email-google-login.page';

describe('EmailGoogleLoginPage', () => {
  let component: EmailGoogleLoginPage;
  let fixture: ComponentFixture<EmailGoogleLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailGoogleLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
