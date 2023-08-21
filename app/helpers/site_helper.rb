require 'csv'
module SiteHelper
  def read_csv(filename)
    table = CSV.parse(File.read(filename), headers: true)
    puts(table)
    table
  end
end
