import path from 'path';
import process from 'process';

export default {
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
};
