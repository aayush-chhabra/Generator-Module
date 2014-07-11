'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var fileNameString="Aayush";   //name with hiphens 
var moduleNameString=""; //name without spaces
var fileNameString1;
var fileName;


var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    // this.on('end', function () {
    //   if (!this.options['skip-install']) {
    //     this.installDependencies();
    //   }
    // });
  },

  askFor: function () {
    var obj = this;
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the Cengage Module generator!'));

    var prompts = [{
      type: 'input',
      name: 'nameModule',
      message: 'Please enter the name of the module: ',
      default: "Hello World"
    }];
    this.prompt(prompts, function (props) {
      
      //module creation 
      this.nameModule = props.nameModule;
      fileNameString = this.nameModule;
      fileNameString = fileNameString.split(' ').join('-');
      fileNameString=fileNameString.concat("-Module");
      moduleNameString = this.nameModule;
      moduleNameString =  moduleNameString.split(' ').join('');
      moduleNameString=moduleNameString.concat("Module");
      this.mkdir(fileNameString);
      fileNameString1 = fileNameString+"/module.js";
      var context = { 
        moduleNameString1: moduleNameString 
      };
      this.template('_module.js', fileNameString1,context);
      fileName = fileNameString;
      console.log(fileName);
      fileNameString = fileNameString+"/main.js";
      //var moduleNameString2;
      var temp = "'./module',\n\t'./templates'";
      //console.log(temp);
      var context1 = {
        moduleDescription: temp
      }
      this.template("_main.js", fileNameString, context1);

      
      var destinationPath = obj.destinationRoot() + "/config.js";
      var indexFile = obj.readFileAsString(destinationPath);
      var startPositionOfRequire = indexFile.indexOf("require.config(");
      var stringInRequire = indexFile.substring(startPositionOfRequire+("require.config(").length);
      //console.log(stringInRequire);
      stringInRequire=stringInRequire.split(");");
      //console.log(stringInRequire[0]);
      
      //extracting path from the above string
      
      var appVersion = "";      //temporarily defining appVersion just to eval.
      var objectInRequire = eval("("+stringInRequire[0]+ ")");
      //console.log(stringInRequire);

      var stringToInsert = "objectInRequire.paths." + moduleNameString + " = " + "'" + moduleNameString + "'";
      var stringToInsertInPackage = "objectInRequire.packages.push('"+moduleNameString+"')" 
      eval(stringToInsert);
      eval(stringToInsertInPackage);

      var stringInObjectInRequire = JSON.stringify(objectInRequire,null,'\t');

      context1 = {
        requireConfig: stringInObjectInRequire
      };
      this.template("_config.js","config.js", context1);

      done();
    }.bind(this));
  },

   addModuletoModule_json: function () {
      console.log("addModuletoModule_json");
    }
});

module.exports = ModuleGenerator;
