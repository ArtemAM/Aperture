import animateClients from "./clientsAnimation.js"
import animateContact from "./contactAnimation.js"
import animateFooter from "./footerAnimation.js"
import animateForm from "./formAnimation.js"
import animateGearCage from "./gearCageAnimation.js"
import animateHero from "./heroAnimation.js"
import animateHeroSection1 from "./heroSection1Animation.js"
import animateHeroSection2 from "./heroSection2Animation.js"
import animateHeroSection3 from "./heroSection3Animation.js"
import animateHeroSection4 from "./heroSection4Animation.js"
import animateScrollToSection from "./scrollToSectionAnimation.js"
import animateWorks from "./worksAnimation.js"

function initAnimations() {
  animateHero()
  animateScrollToSection()
  animateWorks()
  animateHeroSection3()
  animateGearCage()
  animateForm()
  animateHeroSection4()
  animateClients()
  setTimeout(() => {
    animateHeroSection1()
    animateContact()
    animateFooter()
  }, 1000)
  // setTimeout(animateHeroSection2, 3000)
  
}

export default initAnimations