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
    
    //console.log(fileNameString);
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

      
      
      
      // });
      done();
    }.bind(this));
  },

   addModuletoModule_json: function () {
      // var flagToCheckModule = 0;
      // var indexFile = this.readFileAsString(fileNameString);
      // var startPositionOfDefine = indexFile.indexOf("define([");
      // var stringInDefine = indexFile.substring(startPositionOfDefine+8);
      // var stringInDefine = stringInDefine.split(']');
      // console.log(stringInDefine[0]);   // get the string in the define function to replace it with a new text, for the controller.
      // this is the code for controller and directive.
      





      //var stringToInsert = ","+"'./"+fileNameString+"'"+"\n"+"//yeoman_hook";
      //console.log(indexFile);
      //var res = indexFile.replace("//yeoman_hook", stringToInsert);
      
      // try
      // {
      //   var destinationPath = this.destinationRoot() + "/modules.json";
      //   this.read(destinationPath);
      // }
      // catch(err)
      // {
      //   this.write("modules.json",fileName);
      //   flagToCheckModule=1;
      // }
      // finally
      // {
      //   if(flagToCheckModule==0)
      //   {
      //     var indexFile = this.readFileAsString("modules.json");
      //      indexFile = indexFile.concat("\n"+fileName);
      //      this.write("modules.json",indexFile);
      //   }
      // }
    }
});

module.exports = ModuleGenerator;
