# [Felles designprofil](http://slfwiki.master.no/display/SYST/GUI+designmanual)

Pakken inneholder 

* CSS
* Logo, emblemer og bakgrunner
* Bootstrap 3
* jQuery
* modernizr.js

Bruk **mvn deploy** for å legge ut ny versjon. 

For bruk i prosjekter så vil maven sørge for at WAR-filen pakkes korrekt. Koden under kan brukes for å bruke den lokalt:


```java
class DevWebServer extends WebServer { 
    ...
    private void addFellesdesignToClasspath(WebAppContext webAppContext) {
        /* Uten commons-io */
        final File fellesDesign = new File("melk-war/target/melk-war-6.3.0-SNAPSHOT/WEB-INF/lib/").listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.startsWith("felles-design") && name.endsWith(".jar");
            }
        })[0];
        
        /* Med commons-io */
        private void addFellesdesignToClasspath(WebAppContext webAppContext) {
            final File fellesDesign = (File) FileUtils.iterateFiles(new File("melk-war/target"), new WildcardFileFilter("felles-design*.jar"), TrueFileFilter.INSTANCE).next();
            webAppContext.setExtraClasspath(fellesDesign.getAbsolutePath());
        }

    
        webAppContext.setExtraClasspath(fellesDesign.getAbsolutePath());
    }
    ...
}
```

```bash
npm install --prefix ./src/main/webapp bootstrap
```
