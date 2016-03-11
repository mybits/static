require 'govuk_component_test_helper'

class FixedAnchorTestCase < ComponentTestCase
  def component_name
    "fixed_anchor"
  end

  test "no error if no parameters passed in" do
    assert_nothing_raised do
      render_component({})
      assert_select ".govuk-fixed-anchor"
    end
  end
end
