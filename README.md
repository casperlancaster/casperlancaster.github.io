# Clayton Miller — Full Sail Developer Portfolio

This is the **black / red / lime-green** static website designed for `https://casperlancaster.github.io/`.
It uses only HTML, CSS, JavaScript, local images, and optional Google Fonts. **No PythonAnywhere or build step needed.**

## Important: school assignment status

The published website can go online immediately **as an in-progress draft**. For your final school submission, finish:

- [ ] Add at least one **real screenshot of TruckzSim** (the large truck image is labeled concept artwork)
- [x] Link directly to the verified TruckzSim GitHub repository
- [ ] Record and link a demonstration video of TruckzSim running
- [ ] Create and export your real résumé as `assets/student-resume.pdf`, then add a working link in the homepage
- [ ] Confirm navigation/mobile display and all external links
- [ ] Finish any other items in the course rubric

The site now accurately describes the completed dispatch, fuel, HOS, maintenance, finance, and saved-company features.

## Publish on GitHub Pages — separate from your COS119 code repository

1. On GitHub, create **a new public repository named exactly `casperlancaster.github.io`**, with **Add a README file** checked so GitHub creates `main`.
2. On Windows, in Git Bash, run:

   ```bash
   cd /c/Projects
   git clone https://github.com/casperlancaster/casperlancaster.github.io.git
   cd casperlancaster.github.io
   git switch -c dev
   ```

3. Copy the **contents** of this website folder into `C:\Projects\casperlancaster.github.io`, not the website folder itself. Make sure `index.html`, `css/`, `images/`, `js/`, and `assets/` are directly in the repository root. The existing repository README can be replaced with this file.
4. In Git Bash (inside the cloned website repository):

   ```bash
   git add -A
   git diff --cached --check
   git commit -m "Create black red and lime developer portfolio"
   git push -u origin dev
   ```

5. On GitHub in the portfolio repository, select **Compare & pull request** and set base=`main`, compare=`dev`. Merge.
6. In the portfolio repository open **Settings → Pages → Build and deployment** and select Source=`Deploy from a branch`, Branch=`main`, Folder=`/(root)`, then Save.
7. Open `https://casperlancaster.github.io/` and verify the images, layout, and navigation.

**NOTE:** Never copy this site into your separate `COS1-Clayton-Miller` project repository. Keeping the website and C++ course repository separate makes the required GitHub Pages URL work.

## Website file structure

```text
index.html             Homepage (required at repository root)
css/style.css          Colors and responsive styling
js/main.js             Mobile menu and small interactions
images/                Website images and graphics
assets/                Résumé template; replace/add final PDF
.nojekyll              Disable unnecessary Jekyll processing
README.md              Website setup and remaining rubric checklist
```

The existing `assets/Starter_Resume_Template.docx` is a starter template, not a final résumé. The portfolio intentionally does not contain a broken résumé link.
