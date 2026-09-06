#!/usr/bin/env node
/* Extract data arrays from the source HTML file into TS modules (verbatim content). */
const fs = require('fs');
const SRC = '/home/z/my-project/upload/Pasted Content_1788681231365.txt';
const OUT = '/home/z/my-project/src/data';
const lines = fs.readFileSync(SRC, 'utf8').split('\n');

function slice(a, b) { // 1-indexed inclusive
  return lines.slice(a - 1, b).join('\n').trim();
}

fs.mkdirSync(OUT, { recursive: true });

const projects = slice(911, 1115).replace(/^const PROJECTS =/, 'export const PROJECTS:');
const posts = slice(1124, 1337).replace(/^const POSTS =/, 'export const POSTS:');
const exp = slice(1347, 1368).replace(/^const EXP =/, 'export const EXP:');
const career = slice(1370, 1377).replace(/^const CAREER =/, 'export const CAREER:');
const skillCats = slice(1379, 1385).replace(/^const SKILL_CATS =/, 'export const SKILL_CATS:');
const skillEng = slice(1386, 1394).replace(/^const SKILL_ENG =/, 'export const SKILL_ENG:');
const stack = slice(1395, 1405).replace(/^const STACK =/, 'export const STACK:');
const services = slice(1406, 1416).replace(/^const SERVICES =/, 'export const SERVICES:');
const process = slice(1417, 1424).replace(/^const PROCESS =/, 'export const PROCESS:');
const uses = slice(1425, 1455).replace(/^const USES =/, 'export const USES:');
const faqs = slice(1456, 1462).replace(/^const FAQS =/, 'export const FAQS:');
const playg = slice(1463, 1472).replace(/^const PLAYG =/, 'export const PLAYG:');
const cats = slice(1473, 1473);
const minis = slice(1117, 1122).replace(/^const MINIS =/, 'export const MINIS:');
const testimonials = slice(1339, 1345).replace(/^const TESTIMONIALS =/, 'export const TESTIMONIALS:');

fs.writeFileSync(`${OUT}/_projects.ts`, projects + '\n');
fs.writeFileSync(`${OUT}/_posts.ts`, posts + '\n');
fs.writeFileSync(`${OUT}/_misc.ts`, [minis, testimonials, exp, career, skillCats, skillEng, stack, services, process, uses, faqs, playg, cats].join('\n\n') + '\n');
console.log('fragments written');
console.log('projects lines:', projects.split('\n').length, '| posts:', posts.split('\n').length, '| misc:', [minis, testimonials, exp, career, skillCats, skillEng, stack, services, process, uses, faqs, playg, cats].map(s => s.split('\n').length).join(','));
