import { Injectable } from '@nestjs/common';
import * as child_process from 'child_process';
import { AuthService } from 'src/auth/auth.service';
import * as fs from 'fs';

@Injectable()
export class RunnerService {
  // type: string;
  // input: Array<string>;
  // output: Array<string> = [];
  // time: Date = new Date();
  constructor(private readonly auth: AuthService) {
    // this.type = type;
    // this.input = input;
    // fs.writeFileSync('tmp.' + this.type, code);
  }
  async run(body: any) {
    fs.mkdir(
      '' + (await this.auth.getUserFromToken(body.token)).name,
      { recursive: true },
      (err) => {
        if (err) {
          console.log(err);
        }
      },
    );
    const location: string =
      './' +
      (await this.auth.getUserFromToken(body.token)).name +
      '/tmp.' +
      body.type;
    fs.writeFileSync(location, body.code);
    switch (body.type) {
      case 'c': {
        return { output: this.c(body, location) };
      }
      case 'cpp': {
        this.cpp(body, location);
      }
      case 'js': {
        return { output: this.js(body, location) };
      }
      case 'go': {
        this.go(body, location);
      }
      case 'ts': {
        this.ts(body, location);
      }
      case 'py': {
        this.py(body, location);
      }
    }
  }
  c(body: any, location: string) {
    const output: Array<string> = [];
    if (body.input == '' || body.input == undefined) {
      child_process.spawnSync('gcc', [location, '-o', 'tmp'], {
        encoding: 'utf8',
        shell: true,
      });
      const result = child_process.spawnSync('./tmp', {
        encoding: 'utf8',
        shell: true,
      });
      output.push(result.stdout as string);
      return output;
    }
    for (const ip of body.input) {
      const test = child_process.spawnSync('gcc', [location, '-o', 'tmp'], {
        encoding: 'utf8',
        shell: true,
      });
      console.log(test.stderr);
      const result = child_process.spawnSync(
        '.' + location.slice(0, location.length - 2),
        {
          encoding: 'utf8',
          shell: true,
          input: ip,
        },
      );
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    return output;
  }

  cpp(body: any, location: string) {
    const output: Array<string> = [];
    if (body.input == []) {
      const test = child_process.spawnSync('g++', [location, '-o', 'tmp'], {
        encoding: 'utf8',
        shell: true,
      });
      console.log(test.stderr);
      const result = child_process.spawnSync('./tmp', {
        encoding: 'utf8',
        shell: true,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    for (const ip of body.input) {
      const test = child_process.spawnSync('g++', [location, '-o', 'tmp'], {
        encoding: 'utf8',
        shell: true,
      });
      console.log(test.stderr);
      const result = child_process.spawnSync(
        '.' + location.slice(0, location.length - 4),
        {
          encoding: 'utf8',
          shell: true,
          input: ip,
        },
      );
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    return output;
  }

  js(body: any, location: string) {
    const output: Array<string> = [];
    if (body.input == []) {
      const result = child_process.spawnSync('node', [location], {
        encoding: 'utf8',
        shell: true,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
      return output;
    }
    for (const ip of body.input) {
      const result = child_process.spawnSync('node', [location], {
        encoding: 'utf8',
        shell: true,
        input: ip,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    return output;
  }

  go(body: any, location: string) {
    const output: Array<string> = [];
    if (body.input == []) {
      const result = child_process.spawnSync('go', ['run', location], {
        encoding: 'utf8',
        shell: true,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    for (const ip of body.input) {
      const result = child_process.spawnSync('go', ['run', location], {
        encoding: 'utf8',
        shell: true,
        input: ip,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    return output;
  }

  ts(body: any, location: string) {
    const output: Array<string> = [];
    if (body.input == []) {
      const result = child_process.spawnSync('ts-node', [location], {
        encoding: 'utf8',
        shell: true,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    for (const ip of body.input) {
      const result = child_process.spawnSync('ts-node', [location], {
        encoding: 'utf8',
        shell: true,
        input: ip,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    return output;
  }

  py(body: any, location: string) {
    const output: Array<string> = [];
    if (body.input == []) {
      const result = child_process.spawnSync('python3', [location], {
        encoding: 'utf8',
        shell: true,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    for (const ip of body.input) {
      const result = child_process.spawnSync('python3', [location], {
        encoding: 'utf8',
        shell: true,
        input: ip,
      });
      console.log(result.stdout);
      output.push(result.stdout as string);
    }
    return output;
  }
  // ts() {
  //   if ((this.input = [])) {
  //     const test = child_process.spawnSync(
  //       'ts-node',
  //       ['run', '~/OSS/main/tmp.c'],
  //       {
  //         encoding: 'utf8',
  //         shell: true,
  //       },
  //     );
  //     console.log(test.stdout);
  //     this.output.push(test.stdout as string);
  //   }
  //   for (const ip of this.input) {
  //     const test = child_process.spawnSync(
  //       'ts-node',
  //       ['run', '~/OSS/main/tmp.c'],
  //       {
  //         encoding: 'utf8',
  //         shell: true,
  //         input: ip,
  //       },
  //     );
  //     console.log(test.stdout);
  //     this.output.push(test.stdout as string);
  //   }
  // }
}
