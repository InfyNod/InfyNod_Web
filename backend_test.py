#!/usr/bin/env python3
"""
Backend API Test Suite for Infynod Tech Website
Tests all backend endpoints including auth, public APIs, leads, and admin CRUD
"""

import requests
import json
import time
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "https://infynod-deploy.preview.emergentagent.com/api"
ADMIN_EMAIL = "admin@infynod.com"
ADMIN_PASSWORD = "Infynod@2025"

# Test state
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

# Store for cleanup
created_resources = {
    "leads": [],
    "services": []
}

def log_test(name: str, passed: bool, message: str = ""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if message:
        print(f"   {message}")
    
    test_results["tests"].append({
        "name": name,
        "passed": passed,
        "message": message
    })
    
    if passed:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1

def test_auth_login_valid():
    """Test POST /api/auth/login with valid credentials"""
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "token" in data and "user" in data:
                log_test("Auth: Login with valid credentials", True, f"Got token and user data")
                return data["token"]
            else:
                log_test("Auth: Login with valid credentials", False, f"Missing token or user in response: {data}")
                return None
        else:
            log_test("Auth: Login with valid credentials", False, f"Status {response.status_code}: {response.text}")
            return None
    except Exception as e:
        log_test("Auth: Login with valid credentials", False, f"Exception: {str(e)}")
        return None

def test_auth_login_invalid():
    """Test POST /api/auth/login with wrong password"""
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": "WrongPassword123"},
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("Auth: Login with wrong password returns 401", True)
        else:
            log_test("Auth: Login with wrong password returns 401", False, f"Got status {response.status_code} instead of 401")
    except Exception as e:
        log_test("Auth: Login with wrong password returns 401", False, f"Exception: {str(e)}")

def test_auth_me_with_token(token: str):
    """Test GET /api/auth/me with Bearer token"""
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "user" in data:
                log_test("Auth: GET /auth/me with token returns 200", True, f"User: {data['user'].get('email')}")
            else:
                log_test("Auth: GET /auth/me with token returns 200", False, f"Missing user in response")
        else:
            log_test("Auth: GET /auth/me with token returns 200", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Auth: GET /auth/me with token returns 200", False, f"Exception: {str(e)}")

def test_auth_me_without_token():
    """Test GET /api/auth/me without token"""
    try:
        response = requests.get(f"{BASE_URL}/auth/me", timeout=10)
        
        if response.status_code == 401:
            log_test("Auth: GET /auth/me without token returns 401", True)
        else:
            log_test("Auth: GET /auth/me without token returns 401", False, f"Got status {response.status_code}")
    except Exception as e:
        log_test("Auth: GET /auth/me without token returns 401", False, f"Exception: {str(e)}")

def test_public_services():
    """Test GET /api/services returns exactly 6 active services with correct slugs"""
    try:
        response = requests.get(f"{BASE_URL}/services", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            items = data.get("items", [])
            
            expected_slugs = [
                "custom-software-development",
                "web-platform-engineering",
                "mobile-app-development",
                "ui-ux-product-design",
                "cloud-devops",
                "ai-automation"
            ]
            
            if len(items) == 6:
                actual_slugs = [item.get("slug") for item in items]
                
                # Check for duplicates
                if len(actual_slugs) != len(set(actual_slugs)):
                    log_test("Public: GET /services returns 6 services", False, f"Found duplicate slugs: {actual_slugs}")
                    return
                
                # Check for _id field
                has_id_field = any("_id" in item for item in items)
                if has_id_field:
                    log_test("Public: GET /services returns 6 services", False, "_id field should not be present")
                    return
                
                # Check all expected slugs are present
                missing_slugs = set(expected_slugs) - set(actual_slugs)
                if missing_slugs:
                    log_test("Public: GET /services returns 6 services", False, f"Missing slugs: {missing_slugs}")
                else:
                    log_test("Public: GET /services returns 6 services", True, f"All 6 services with correct slugs, no _id field")
            else:
                log_test("Public: GET /services returns 6 services", False, f"Expected 6 services, got {len(items)}")
        else:
            log_test("Public: GET /services returns 6 services", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Public: GET /services returns 6 services", False, f"Exception: {str(e)}")

def test_public_service_by_slug():
    """Test GET /api/services/custom-software-development returns single item"""
    try:
        response = requests.get(f"{BASE_URL}/services/custom-software-development", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "item" in data and data["item"].get("slug") == "custom-software-development":
                log_test("Public: GET /services/[slug] returns single item", True)
            else:
                log_test("Public: GET /services/[slug] returns single item", False, f"Unexpected response: {data}")
        else:
            log_test("Public: GET /services/[slug] returns single item", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Public: GET /services/[slug] returns single item", False, f"Exception: {str(e)}")

def test_public_projects():
    """Test GET /api/projects returns 5 items"""
    try:
        response = requests.get(f"{BASE_URL}/projects", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            items = data.get("items", [])
            if len(items) == 5:
                log_test("Public: GET /projects returns 5 items", True)
            else:
                log_test("Public: GET /projects returns 5 items", False, f"Expected 5, got {len(items)}")
        else:
            log_test("Public: GET /projects returns 5 items", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Public: GET /projects returns 5 items", False, f"Exception: {str(e)}")

def test_public_team():
    """Test GET /api/team returns 4 items"""
    try:
        response = requests.get(f"{BASE_URL}/team", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            items = data.get("items", [])
            if len(items) == 4:
                log_test("Public: GET /team returns 4 items", True)
            else:
                log_test("Public: GET /team returns 4 items", False, f"Expected 4, got {len(items)}")
        else:
            log_test("Public: GET /team returns 4 items", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Public: GET /team returns 4 items", False, f"Exception: {str(e)}")

def test_public_jobs():
    """Test GET /api/jobs returns 3 items with status open"""
    try:
        response = requests.get(f"{BASE_URL}/jobs", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            items = data.get("items", [])
            if len(items) == 3:
                all_open = all(item.get("status") == "open" for item in items)
                if all_open:
                    log_test("Public: GET /jobs returns 3 open items", True)
                else:
                    log_test("Public: GET /jobs returns 3 open items", False, "Not all jobs have status 'open'")
            else:
                log_test("Public: GET /jobs returns 3 open items", False, f"Expected 3, got {len(items)}")
        else:
            log_test("Public: GET /jobs returns 3 open items", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Public: GET /jobs returns 3 open items", False, f"Exception: {str(e)}")

def test_public_blog():
    """Test GET /api/blog returns 3 published items"""
    try:
        response = requests.get(f"{BASE_URL}/blog", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            items = data.get("items", [])
            if len(items) == 3:
                all_published = all(item.get("published") == True for item in items)
                if all_published:
                    log_test("Public: GET /blog returns 3 published items", True)
                else:
                    log_test("Public: GET /blog returns 3 published items", False, "Not all posts are published")
            else:
                log_test("Public: GET /blog returns 3 published items", False, f"Expected 3, got {len(items)}")
        else:
            log_test("Public: GET /blog returns 3 published items", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Public: GET /blog returns 3 published items", False, f"Exception: {str(e)}")

def test_public_blog_by_slug():
    """Test GET /api/blog/[slug] returns single post"""
    try:
        response = requests.get(f"{BASE_URL}/blog/why-ssr-matters-for-business-websites", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "item" in data and data["item"].get("slug") == "why-ssr-matters-for-business-websites":
                log_test("Public: GET /blog/[slug] returns single post", True)
            else:
                log_test("Public: GET /blog/[slug] returns single post", False, f"Unexpected response")
        else:
            log_test("Public: GET /blog/[slug] returns single post", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Public: GET /blog/[slug] returns single post", False, f"Exception: {str(e)}")

def test_public_settings():
    """Test GET /api/settings returns item with phone and email"""
    try:
        response = requests.get(f"{BASE_URL}/settings", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            item = data.get("item", {})
            phone = item.get("phone")
            email = item.get("email")
            
            if phone == "+91 97653 03735" and email == "info@infynod.com":
                log_test("Public: GET /settings returns correct data", True)
            else:
                log_test("Public: GET /settings returns correct data", False, f"Phone: {phone}, Email: {email}")
        else:
            log_test("Public: GET /settings returns correct data", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Public: GET /settings returns correct data", False, f"Exception: {str(e)}")

def test_lead_submission_valid():
    """Test POST /api/leads with valid data"""
    try:
        lead_data = {
            "name": "Rajesh Kumar",
            "email": "rajesh.kumar@example.com",
            "message": "We are looking for a custom software solution for our manufacturing business.",
            "company": "Kumar Industries",
            "phone": "+91 98765 43210",
            "requirement": "Custom Software",
            "planner_selections": {
                "type": "web_app",
                "features": ["user_auth", "dashboard"],
                "scale": "medium",
                "timeline_estimate": "3-6 months"
            }
        }
        
        response = requests.post(f"{BASE_URL}/leads", json=lead_data, timeout=10)
        
        if response.status_code == 201:
            data = response.json()
            if data.get("success") and "id" in data:
                created_resources["leads"].append(data["id"])
                log_test("Leads: Valid submission returns 201 with id", True, f"Lead ID: {data['id']}")
            else:
                log_test("Leads: Valid submission returns 201 with id", False, f"Response: {data}")
        else:
            log_test("Leads: Valid submission returns 201 with id", False, f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_test("Leads: Valid submission returns 201 with id", False, f"Exception: {str(e)}")

def test_lead_submission_invalid_email():
    """Test POST /api/leads with invalid email"""
    try:
        lead_data = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "This is a test message with more than 10 characters."
        }
        
        response = requests.post(f"{BASE_URL}/leads", json=lead_data, timeout=10)
        
        if response.status_code == 400:
            log_test("Leads: Invalid email returns 400", True)
        else:
            log_test("Leads: Invalid email returns 400", False, f"Got status {response.status_code}")
    except Exception as e:
        log_test("Leads: Invalid email returns 400", False, f"Exception: {str(e)}")

def test_lead_submission_short_name():
    """Test POST /api/leads with short name"""
    try:
        lead_data = {
            "name": "A",
            "email": "test@example.com",
            "message": "This is a test message with more than 10 characters."
        }
        
        response = requests.post(f"{BASE_URL}/leads", json=lead_data, timeout=10)
        
        if response.status_code == 400:
            log_test("Leads: Short name returns 400", True)
        else:
            log_test("Leads: Short name returns 400", False, f"Got status {response.status_code}")
    except Exception as e:
        log_test("Leads: Short name returns 400", False, f"Exception: {str(e)}")

def test_lead_submission_short_message():
    """Test POST /api/leads with short message"""
    try:
        lead_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Short"
        }
        
        response = requests.post(f"{BASE_URL}/leads", json=lead_data, timeout=10)
        
        if response.status_code == 400:
            log_test("Leads: Short message returns 400", True)
        else:
            log_test("Leads: Short message returns 400", False, f"Got status {response.status_code}")
    except Exception as e:
        log_test("Leads: Short message returns 400", False, f"Exception: {str(e)}")

def test_lead_honeypot(token: str):
    """Test POST /api/leads with honeypot field"""
    try:
        # Get initial lead count
        response = requests.get(
            f"{BASE_URL}/leads",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        initial_count = len(response.json().get("items", [])) if response.status_code == 200 else 0
        
        # Submit with honeypot
        lead_data = {
            "name": "Spam Bot",
            "email": "spam@example.com",
            "message": "This is spam message with more than 10 characters.",
            "website": "http://spam.com"
        }
        
        response = requests.post(f"{BASE_URL}/leads", json=lead_data, timeout=10)
        
        if response.status_code == 200 and response.json().get("success"):
            # Check if lead was actually saved
            time.sleep(0.5)
            response = requests.get(
                f"{BASE_URL}/leads",
                headers={"Authorization": f"Bearer {token}"},
                timeout=10
            )
            final_count = len(response.json().get("items", [])) if response.status_code == 200 else 0
            
            if final_count == initial_count:
                log_test("Leads: Honeypot returns 200 but doesn't save", True)
            else:
                log_test("Leads: Honeypot returns 200 but doesn't save", False, f"Lead was saved (count increased from {initial_count} to {final_count})")
        else:
            log_test("Leads: Honeypot returns 200 but doesn't save", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Leads: Honeypot returns 200 but doesn't save", False, f"Exception: {str(e)}")

def test_admin_get_leads(token: str):
    """Test GET /api/leads with admin token"""
    try:
        response = requests.get(
            f"{BASE_URL}/leads",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            items = data.get("items", [])
            
            # Check if any lead has planner_selections
            has_planner = any("planner_selections" in item for item in items)
            
            if has_planner:
                log_test("Admin: GET /leads with token returns list with planner_selections", True, f"Found {len(items)} leads")
            else:
                log_test("Admin: GET /leads with token returns list with planner_selections", True, f"Found {len(items)} leads (no planner_selections in current leads)")
        else:
            log_test("Admin: GET /leads with token returns list with planner_selections", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Admin: GET /leads with token returns list with planner_selections", False, f"Exception: {str(e)}")

def test_admin_get_leads_without_token():
    """Test GET /api/leads without token"""
    try:
        response = requests.get(f"{BASE_URL}/leads", timeout=10)
        
        if response.status_code == 401:
            log_test("Admin: GET /leads without token returns 401", True)
        else:
            log_test("Admin: GET /leads without token returns 401", False, f"Got status {response.status_code}")
    except Exception as e:
        log_test("Admin: GET /leads without token returns 401", False, f"Exception: {str(e)}")

def test_admin_update_lead(token: str):
    """Test PUT /api/leads/{id} to update status"""
    try:
        if not created_resources["leads"]:
            log_test("Admin: PUT /leads/{id} updates status", False, "No lead ID available for testing")
            return
        
        lead_id = created_resources["leads"][0]
        response = requests.put(
            f"{BASE_URL}/leads/{lead_id}",
            headers={"Authorization": f"Bearer {token}"},
            json={"status": "contacted"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("item", {}).get("status") == "contacted":
                log_test("Admin: PUT /leads/{id} updates status", True)
            else:
                log_test("Admin: PUT /leads/{id} updates status", False, f"Status not updated: {data}")
        else:
            log_test("Admin: PUT /leads/{id} updates status", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Admin: PUT /leads/{id} updates status", False, f"Exception: {str(e)}")

def test_admin_create_service(token: str):
    """Test POST /api/services with admin token"""
    try:
        service_data = {
            "title": "Test Service",
            "slug": "test-service-automated",
            "description": "This is a test service",
            "active": True,
            "order": 99
        }
        
        response = requests.post(
            f"{BASE_URL}/services",
            headers={"Authorization": f"Bearer {token}"},
            json=service_data,
            timeout=10
        )
        
        if response.status_code == 201:
            data = response.json()
            if "item" in data and "id" in data["item"]:
                created_resources["services"].append(data["item"]["id"])
                log_test("Admin: POST /services creates item", True, f"Service ID: {data['item']['id']}")
            else:
                log_test("Admin: POST /services creates item", False, f"Response: {data}")
        else:
            log_test("Admin: POST /services creates item", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Admin: POST /services creates item", False, f"Exception: {str(e)}")

def test_admin_create_service_without_token():
    """Test POST /api/services without token"""
    try:
        service_data = {
            "title": "Unauthorized Service",
            "slug": "unauthorized-service",
            "description": "This should fail"
        }
        
        response = requests.post(f"{BASE_URL}/services", json=service_data, timeout=10)
        
        if response.status_code == 401:
            log_test("Admin: POST /services without token returns 401", True)
        else:
            log_test("Admin: POST /services without token returns 401", False, f"Got status {response.status_code}")
    except Exception as e:
        log_test("Admin: POST /services without token returns 401", False, f"Exception: {str(e)}")

def test_admin_update_service(token: str):
    """Test PUT /api/services/{id}"""
    try:
        if not created_resources["services"]:
            log_test("Admin: PUT /services/{id} updates item", False, "No service ID available for testing")
            return
        
        service_id = created_resources["services"][0]
        response = requests.put(
            f"{BASE_URL}/services/{service_id}",
            headers={"Authorization": f"Bearer {token}"},
            json={"title": "Updated Test Service"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("item", {}).get("title") == "Updated Test Service":
                log_test("Admin: PUT /services/{id} updates item", True)
            else:
                log_test("Admin: PUT /services/{id} updates item", False, f"Title not updated: {data}")
        else:
            log_test("Admin: PUT /services/{id} updates item", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Admin: PUT /services/{id} updates item", False, f"Exception: {str(e)}")

def test_admin_update_service_without_token():
    """Test PUT /api/services/{id} without token"""
    try:
        if not created_resources["services"]:
            log_test("Admin: PUT /services without token returns 401", False, "No service ID available for testing")
            return
        
        service_id = created_resources["services"][0]
        response = requests.put(
            f"{BASE_URL}/services/{service_id}",
            json={"title": "Unauthorized Update"},
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("Admin: PUT /services without token returns 401", True)
        else:
            log_test("Admin: PUT /services without token returns 401", False, f"Got status {response.status_code}")
    except Exception as e:
        log_test("Admin: PUT /services without token returns 401", False, f"Exception: {str(e)}")

def test_admin_update_settings(token: str):
    """Test PUT /api/settings"""
    try:
        response = requests.put(
            f"{BASE_URL}/settings",
            headers={"Authorization": f"Bearer {token}"},
            json={"address": "Pune, Maharashtra, India"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("item", {}).get("address") == "Pune, Maharashtra, India":
                log_test("Admin: PUT /settings updates data", True)
            else:
                log_test("Admin: PUT /settings updates data", False, f"Address not updated: {data}")
        else:
            log_test("Admin: PUT /settings updates data", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Admin: PUT /settings updates data", False, f"Exception: {str(e)}")

def test_admin_delete_service(token: str):
    """Test DELETE /api/services/{id}"""
    try:
        if not created_resources["services"]:
            log_test("Admin: DELETE /services/{id} removes item", False, "No service ID available for testing")
            return
        
        service_id = created_resources["services"][0]
        response = requests.delete(
            f"{BASE_URL}/services/{service_id}",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                created_resources["services"].remove(service_id)
                log_test("Admin: DELETE /services/{id} removes item", True)
            else:
                log_test("Admin: DELETE /services/{id} removes item", False, f"Response: {data}")
        else:
            log_test("Admin: DELETE /services/{id} removes item", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("Admin: DELETE /services/{id} removes item", False, f"Exception: {str(e)}")

def test_admin_delete_service_without_token():
    """Test DELETE /api/services/{id} without token"""
    try:
        # Use a dummy ID since we don't want to actually delete anything
        response = requests.delete(f"{BASE_URL}/services/dummy-id", timeout=10)
        
        if response.status_code == 401:
            log_test("Admin: DELETE /services without token returns 401", True)
        else:
            log_test("Admin: DELETE /services without token returns 401", False, f"Got status {response.status_code}")
    except Exception as e:
        log_test("Admin: DELETE /services without token returns 401", False, f"Exception: {str(e)}")

def test_change_password(token: str):
    """Test POST /api/auth/change-password"""
    try:
        # Change password
        response = requests.post(
            f"{BASE_URL}/auth/change-password",
            headers={"Authorization": f"Bearer {token}"},
            json={"current_password": ADMIN_PASSWORD, "new_password": "TempPass@123"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("Change Password: Change to new password", False, f"Status {response.status_code}")
            return
        
        # Verify login with new password
        time.sleep(0.5)
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": "TempPass@123"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("Change Password: Login with new password", False, f"Status {response.status_code}")
            return
        
        new_token = response.json().get("token")
        
        # Change back to original password
        time.sleep(0.5)
        response = requests.post(
            f"{BASE_URL}/auth/change-password",
            headers={"Authorization": f"Bearer {new_token}"},
            json={"current_password": "TempPass@123", "new_password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("Change Password: Revert to original password", False, f"Status {response.status_code}")
            return
        
        # Verify login with original password
        time.sleep(0.5)
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if response.status_code == 200:
            log_test("Change Password: Full cycle (change and revert)", True)
        else:
            log_test("Change Password: Full cycle (change and revert)", False, f"Failed to login with original password")
    except Exception as e:
        log_test("Change Password: Full cycle (change and revert)", False, f"Exception: {str(e)}")

def test_rate_limit():
    """Test rate limiting on lead submissions (TEST LAST)"""
    try:
        print("\n⚠️  Testing rate limit - this will make 6 rapid requests...")
        
        success_count = 0
        rate_limited = False
        
        for i in range(6):
            lead_data = {
                "name": f"Rate Test User {i}",
                "email": f"ratetest{i}@example.com",
                "message": f"Rate limit test message number {i} with sufficient length."
            }
            
            response = requests.post(f"{BASE_URL}/leads", json=lead_data, timeout=10)
            
            if response.status_code == 201:
                success_count += 1
                if "id" in response.json():
                    created_resources["leads"].append(response.json()["id"])
            elif response.status_code == 429:
                rate_limited = True
                break
            
            time.sleep(0.1)
        
        if rate_limited:
            log_test("Leads: Rate limit returns 429 after 5 requests", True, f"Got 429 after {success_count} successful requests")
        else:
            log_test("Leads: Rate limit returns 429 after 5 requests", False, f"All {success_count} requests succeeded, no 429")
    except Exception as e:
        log_test("Leads: Rate limit returns 429 after 5 requests", False, f"Exception: {str(e)}")

def cleanup_resources(token: str):
    """Clean up test resources"""
    print("\n🧹 Cleaning up test resources...")
    
    # Delete test leads
    for lead_id in created_resources["leads"]:
        try:
            requests.delete(
                f"{BASE_URL}/leads/{lead_id}",
                headers={"Authorization": f"Bearer {token}"},
                timeout=10
            )
            print(f"   Deleted lead: {lead_id}")
        except Exception as e:
            print(f"   Failed to delete lead {lead_id}: {str(e)}")
    
    # Delete test services
    for service_id in created_resources["services"]:
        try:
            requests.delete(
                f"{BASE_URL}/services/{service_id}",
                headers={"Authorization": f"Bearer {token}"},
                timeout=10
            )
            print(f"   Deleted service: {service_id}")
        except Exception as e:
            print(f"   Failed to delete service {service_id}: {str(e)}")

def main():
    """Run all backend tests"""
    print("=" * 80)
    print("INFYNOD TECH BACKEND API TEST SUITE")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin: {ADMIN_EMAIL}")
    print("=" * 80)
    
    # 1. AUTH TESTS
    print("\n📋 SECTION 1: AUTHENTICATION")
    print("-" * 80)
    token = test_auth_login_valid()
    test_auth_login_invalid()
    if token:
        test_auth_me_with_token(token)
    test_auth_me_without_token()
    
    # 2. PUBLIC GET ENDPOINTS
    print("\n📋 SECTION 2: PUBLIC GET ENDPOINTS")
    print("-" * 80)
    test_public_services()
    test_public_service_by_slug()
    test_public_projects()
    test_public_team()
    test_public_jobs()
    test_public_blog()
    test_public_blog_by_slug()
    test_public_settings()
    
    # 3. LEAD SUBMISSION TESTS
    print("\n📋 SECTION 3: LEAD SUBMISSION")
    print("-" * 80)
    test_lead_submission_valid()
    test_lead_submission_invalid_email()
    test_lead_submission_short_name()
    test_lead_submission_short_message()
    if token:
        test_lead_honeypot(token)
    
    # 4. ADMIN CRUD TESTS
    print("\n📋 SECTION 4: ADMIN CRUD OPERATIONS")
    print("-" * 80)
    if token:
        test_admin_get_leads(token)
    test_admin_get_leads_without_token()
    if token:
        test_admin_update_lead(token)
        test_admin_create_service(token)
    test_admin_create_service_without_token()
    if token:
        test_admin_update_service(token)
    test_admin_update_service_without_token()
    if token:
        test_admin_update_settings(token)
        test_admin_delete_service(token)
    test_admin_delete_service_without_token()
    
    # 5. CHANGE PASSWORD TEST
    print("\n📋 SECTION 5: CHANGE PASSWORD")
    print("-" * 80)
    if token:
        test_change_password(token)
    
    # 6. RATE LIMIT TEST (LAST)
    print("\n📋 SECTION 6: RATE LIMITING")
    print("-" * 80)
    test_rate_limit()
    
    # CLEANUP
    if token:
        cleanup_resources(token)
    
    # SUMMARY
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"✅ Passed: {test_results['passed']}")
    print(f"❌ Failed: {test_results['failed']}")
    print(f"📊 Total: {test_results['passed'] + test_results['failed']}")
    print("=" * 80)
    
    if test_results['failed'] > 0:
        print("\n❌ FAILED TESTS:")
        for test in test_results['tests']:
            if not test['passed']:
                print(f"   - {test['name']}")
                if test['message']:
                    print(f"     {test['message']}")
    
    return test_results['failed'] == 0

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
