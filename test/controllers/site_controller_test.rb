require "test_helper"

class SiteControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get site_index_url
    assert_response :success
  end

  test "should get analyze" do
    get site_analyze_url
    assert_response :success
  end

  test "should get contact" do
    get site_contact_url
    assert_response :success
  end
end
