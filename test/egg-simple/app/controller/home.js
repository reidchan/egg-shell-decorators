'use strict';
const { Get, IgnoreJwtAll, Before, After, BeforeAll, AfterAll } = require('egg-shell');

const Before1 = require('egg-shell/test/middlewares/before-1');
const Before2 = require('egg-shell/test/middlewares/before-2');
const Before3 = require('egg-shell/test/middlewares/before-3');
const Before4 = require('egg-shell/test/middlewares/before-4');

const After1 = require('egg-shell/test/middlewares/after-1');
const After2 = require('egg-shell/test/middlewares/after-2');
const After3 = require('egg-shell/test/middlewares/after-3');
const After4 = require('egg-shell/test/middlewares/after-4');

const Controller = require('egg').Controller;

@IgnoreJwtAll
@BeforeAll([ Before1, Before2 ])
@AfterAll([ After1, After2 ])
class HomeController extends Controller {

  @Before([ Before3, Before4 ])
  @After([ After3, After4 ])
  @Get('/')
  async index() {
    return 'hi, egg';
  }

}

module.exports = HomeController;
