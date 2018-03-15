/**
 * @file utils.js
 * @author panyuqi (panyuqi@baidu.com)
 * @desc wrap some useful functions for Koa & express test suites
 */

import semver from 'semver';
import superkoa from 'superkoa';
import supertest from 'supertest';
import uuid from 'uuid';
import {join} from 'path';
import {ensureDir} from 'fs-extra';

// Test Koa when node's version >= 7.6.0 and test express otherwise.
export const isKoaSupport = semver.gte(process.versions.node, '7.6.0');

export function syncConfig(lavasCore, config) {
    lavasCore.config = config;
    lavasCore.builder.init(config);
}

/**
 * get test agent for Koa or express
 *
 * @param {Object} app app
 * @return {Object} agent test agent
 */
export function request(app) {
    return isKoaSupport ? superkoa(app) : supertest(app);
}

/**
 * create a app with Koa or express
 *
 * @return {Object} app app
 */
export function createApp(isForceExpress) {
    if (isKoaSupport && !isForceExpress) {
        const Koa = require('koa');
        return new Koa();
    }

    const express = require('express');
    return express();
}

/**
 * make temp dir in `test` dir
 *
 * @return {string} temp dir
 */
export async function makeTempDir(filepath) {
    let tempDir = join(__dirname, 'temp', uuid.v4(), (filepath || ''));
    await ensureDir(tempDir);
    return tempDir;
}
