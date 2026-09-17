cd ..
rm -force -confirm:$false -recurse _site
mkdir _site

# clone remote repo to "_site"
git clone --depth 1 https://github.com/GradyHooker/gradyhooker.github.io.git --branch gh-pages _site

# build with Jekyll into "_site"
$Env:JEKYLL_ENV = "production"
bundle exec jekyll build JEKYLL_ENV=production
$Env:JEKYLL_ENV = "development"

# copy cname file
cp CNAME _site

# push
cd _site
git config user.name "Grady Bot"
git add --all
git commit -a -m "Grady Build"
git push --force origin gh-pages