# GitHub Copilot Configuration

This directory contains configuration files for GitHub Copilot to provide better assistance when working on the AI Task Force Pro project.

## Structure

```
.github/
├── copilot-instructions.md          # Main repository-wide instructions
├── agents/                           # Specialized agent definitions
│   ├── react-component-agent.md      # React/TypeScript component development
│   ├── testing-agent.md              # Testing and quality assurance
│   └── documentation-agent.md        # Documentation writing
└── instructions/                     # Path-specific instructions
    ├── api-routes.instructions.md    # API routes best practices
    └── typescript.instructions.md    # TypeScript coding guidelines
```

## What Each File Does

### `copilot-instructions.md`

The main repository instructions file that Copilot reads for context about:
- Project overview and tech stack
- Development commands
- Coding conventions with examples
- Security best practices
- Boundaries and constraints
- File organization
- State management patterns
- Accessibility guidelines

### Agents Directory

Contains specialized agent definitions that act as expert personas for specific tasks:

- **`react-component-agent.md`**: Expert in creating and modifying React components with Next.js, TypeScript, and TailwindCSS
- **`testing-agent.md`**: Expert in writing tests with Jest, React Testing Library, and test best practices
- **`documentation-agent.md`**: Expert in writing clear technical documentation, API docs, and guides

### Instructions Directory

Contains path-specific instructions that apply only when working with certain file types or directories:

- **`api-routes.instructions.md`**: Applies when working with `/app/api/**/*.ts` files
- **`typescript.instructions.md`**: Applies when working with `.ts` and `.tsx` files

## How to Use

### For Developers

These files work automatically with GitHub Copilot. When you're working on code:

1. **Copilot reads `copilot-instructions.md`** for general project context
2. **Path-specific instructions activate** when you open relevant files
3. **Agents can be invoked** by referencing them in Copilot chat

### Invoking Agents

In GitHub Copilot chat, you can ask agents to help:

```
@copilot Use the react-component-agent to create a new AgentCard component
```

```
@copilot Use the testing-agent to write tests for the Dashboard component
```

```
@copilot Use the documentation-agent to document the API endpoints
```

## Best Practices

### When to Update These Files

Update Copilot instructions when:
- Adding new major features or patterns
- Changing coding conventions
- Adding new dependencies or frameworks
- Modifying project structure
- Learning common mistakes that should be documented

### What Makes Good Instructions

- **Be specific**: Include concrete examples rather than vague descriptions
- **Show, don't tell**: Code examples are better than paragraphs of explanation
- **Set boundaries**: Clearly state what should and shouldn't be done
- **Stay current**: Update when the project evolves
- **Be concise**: Copilot reads these files, so keep them focused

## References

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Best practices for Copilot coding agent](https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results)
- [Adding repository custom instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [How to write a great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
