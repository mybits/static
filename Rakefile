require 'rake'
require 'rake/tasklib'

ENV['RACK_ENV'] ||= 'production'

require "bundler/setup"
Bundler.require(:default, ENV['RACK_ENV'])
load 'cdn_helpers/cdn_helpers.rake'

task :environment do
end

namespace :cdn do
  desc "Iterate over each html file in public and process for cache busting and asset host URLs"
  task :process_html do
    require 'logger'

    logger = Logger.new(STDOUT)
    public_root_path = Pathname.new(File.join(File.dirname(__FILE__), 'public'))
    
    asset_hosts = case ENV['RACK_ENV']
    when 'dev' then %W(http://assets0.dev.alphagov.co.uk http://assets1.dev.alphagov.co.uk)
    when 'staging' then %W(http://assets0.staging.alphagov.co.uk http://assets1.staging.alphagov.co.uk)
    when 'production' then %W(http://alpha.gov.uk http://alpha.gov.uk)
    end

    Dir.glob(public_root_path.join("**/*.html")).each do |file_path|
      logger.warn "Processing file #{file_path}"
      CdnHelpers::HtmlRewriter.rewrite_file(logger, file_path, public_root_path, asset_hosts)
    end
  end
end
