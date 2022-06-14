from urllib import response
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserProfile

# Create your tests here.
class userProfileTestCase(APITestCase):
    profile_list_url=reverse('all-profiles')
    def setUp(self):
        self.user = self.client.post('/auth/users/', data={'username':'CCCP','password':'super1234'})
        response = self.client.post('/auth/jwt/create/', data={'username':'CCCP','password':'super1234'})
        print(response.data)
        self.token =  response.data['access']
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_userprofile_list_authenticated(self):
        response = self.client.get(self.profile_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_userprofile_list_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.profile_list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_userprofile_detail_retrieve(self):
        response = self.client.get(reverse('profile', kwargs={'pk':1}))
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_userprofile_profile(self):
        profile_data={'description':'I am a very famous game character','location':'nintendo world','is_creator':'true',}
        response=self.client.put(reverse('profile',kwargs={'pk':1}),data=profile_data)
        print(response.data)
        self.assertEqual(response.status_code,status.HTTP_200_OK)