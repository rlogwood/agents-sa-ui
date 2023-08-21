# frozen_string_literal: true

class NavLinkComponent < ViewComponent::Base
  SHARED_STYLE = "hover:bg-gray-100 hover:text-blue-600 rounded-md px-3 py-2 text-md font-medium" #.freeze
  REG_STYLE = "" + SHARED_STYLE #).freeze
  HIGHLIGHT_STYLE = "bg-yellow-200  text-amber-900 " #.freeze
  ACTIVE_STYLE = HIGHLIGHT_STYLE + SHARED_STYLE#).freeze

  attr_reader :text, :path, :style, :attributes

  def initialize(text, path, **attributes)
    @text = text
    @path = path
    @attributes = attributes || {}
    @usr_style = @attributes[:style]
  end

  def before_render

    #puts("path: #{path}")

    page_is_current = current_page?(path)
    #puts("current_page?(path): #{current_page?(path)}")
    #puts("page_is_current: #{page_is_current}")

    if false #@usr_style
      active_style = HIGHLIGHT_STYLE + @usr_style
      @style =  page_is_current ? active_style : @usr_style
    else
      @style =  page_is_current ? ACTIVE_STYLE : REG_STYLE
    end
    #puts("style: #{@style}")
  end
end
